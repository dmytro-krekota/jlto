let assert = require('node:assert');
let fs = require('node:fs');
let os = require('node:os');
let path = require('node:path');
let webpack = require('webpack');
let jlto = require('../../../');
let demoFixtures = require('../../test-utils/demoFixtures');

let readmePath = path.join(__dirname, '../../../README.md');
let readmeContent = fs.readFileSync(readmePath).toString();

let getCodeBlock = (title) => {
  let escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  let matcher = new RegExp(`${escapedTitle}\\n\\n\`\`\`js\\n([\\s\\S]*?)\\n\`\`\``);
  let match = readmeContent.match(matcher);

  assert.ok(match, `Unable to find README example: ${title}`);

  return match[1];
};

let loadReadmeModule = (source) => {
  let module = {exports: {}};
  let loader = new Function('module', 'exports', 'require', source);

  loader(module, module.exports, (moduleName) => {
    if (moduleName === 'jlto') {
      return jlto;
    }

    return require(moduleName);
  });

  return module.exports;
};

let loadFreshGrunt = () => {
  let gruntPath = require.resolve('grunt');

  delete require.cache[gruntPath];

  return require('grunt');
};

let makeTempDirectory = (prefix) => {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
};

let removeDirectory = (directoryPath) => {
  fs.rmSync(directoryPath, {recursive: true, force: true});
};

let runGruntTasks = (grunt, tasks) => {
  return new Promise((resolve, reject) => {
    let originalWarn = grunt.fail.warn;
    let originalFatal = grunt.fail.fatal;

    let restore = () => {
      grunt.fail.warn = originalWarn;
      grunt.fail.fatal = originalFatal;
    };

    grunt.fail.warn = (error) => {
      restore();
      reject(error instanceof Error ? error : new Error(String(error)));
    };
    grunt.fail.fatal = (error) => {
      restore();
      reject(error instanceof Error ? error : new Error(String(error)));
    };

    try {
      grunt.tasks(tasks, {gruntfile: false}, () => {
        restore();
        resolve();
      });
    } catch (error) {
      restore();
      reject(error);
    }
  });
};

let runWebpackCompilation = (configuration) => {
  return new Promise((resolve, reject) => {
    webpack(configuration, (error, stats) => {
      if (error) {
        reject(error);

        return;
      }
      if (stats.hasErrors()) {
        reject(new Error(stats.toString({all: false, errors: true, errorDetails: true})));

        return;
      }

      resolve(stats);
    });
  });
};

describe('Tests for README task examples', () => {
  it('Should run the GruntJS example against nunjucks templates', async () => {
    let source = getCodeBlock('**Example of "nunjucks" templates minification with the custom GruntJS task:**');
    let example = loadReadmeModule(source);
    let tempDirectory = makeTempDirectory('jlto-grunt-');
    let templatesDirectory = path.join(tempDirectory, 'templates');
    let templatePath = path.join(templatesDirectory, 'page.nunjucks.html');
    let untouchedPath = path.join(templatesDirectory, 'notes.txt');
    let templateSource = demoFixtures.minifyHtmlTemplate;
    let expectedOptimizedTemplate = demoFixtures.minifyHtmlOptimizedTemplate;
    let grunt = loadFreshGrunt();
    let originalCwd = process.cwd();
    let optimizedTemplate;
    let untouchedContent;

    fs.mkdirSync(templatesDirectory, {recursive: true});
    fs.writeFileSync(templatePath, templateSource);
    fs.writeFileSync(untouchedPath, 'Leave me alone');

    try {
      process.chdir(tempDirectory);
      example(grunt);
      await runGruntTasks(grunt, ['min-nunjucks']);
      optimizedTemplate = fs.readFileSync(templatePath).toString();
      untouchedContent = fs.readFileSync(untouchedPath).toString();
    } finally {
      process.chdir(originalCwd);
      removeDirectory(tempDirectory);
    }

    assert.strictEqual(optimizedTemplate, expectedOptimizedTemplate);
    assert.strictEqual(untouchedContent, 'Leave me alone');
  });

  it('Should run the webpack example against nunjucks assets', async () => {
    let source = getCodeBlock('**Example of "nunjucks" templates minification with the custom webpack plugin:**');
    let example = loadReadmeModule(source);
    let tempDirectory = makeTempDirectory('jlto-webpack-');
    let sourceDirectory = path.join(tempDirectory, 'src');
    let outputDirectory = path.join(tempDirectory, 'dist');
    let templateOutputPath = path.join(outputDirectory, 'templates/page.nunjucks.html');
    let scriptOutputPath = path.join(outputDirectory, 'assets/app.js');
    let templateSource = demoFixtures.minifyHtmlTemplate;
    let expectedOptimizedTemplate = demoFixtures.minifyHtmlOptimizedTemplate;
    let optimizedTemplate;
    let untouchedScript;

    class EmitNunjucksAssetsPlugin {
      apply(compiler) {
        compiler.hooks.thisCompilation.tap('EmitNunjucksAssetsPlugin', (compilation) => {
          compilation.hooks.processAssets.tap(
            {
              name: 'EmitNunjucksAssetsPlugin',
              stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
            },
            () => {
              compilation.emitAsset('templates/page.nunjucks.html', new webpack.sources.RawSource(templateSource));
              compilation.emitAsset('assets/app.js', new webpack.sources.RawSource('console.log("keep");'));
            },
          );
        });
      }
    }

    fs.mkdirSync(sourceDirectory, {recursive: true});
    fs.writeFileSync(path.join(sourceDirectory, 'index.js'), 'console.log("entry");');

    try {
      await runWebpackCompilation({
        mode: 'production',
        context: tempDirectory,
        entry: './src/index.js',
        output: {
          path: outputDirectory,
          filename: 'bundle.js',
        },
        plugins: [new EmitNunjucksAssetsPlugin(), ...example.plugins],
      });
      optimizedTemplate = fs.readFileSync(templateOutputPath).toString();
      untouchedScript = fs.readFileSync(scriptOutputPath).toString();
    } finally {
      removeDirectory(tempDirectory);
    }

    assert.strictEqual(optimizedTemplate, expectedOptimizedTemplate);
    assert.strictEqual(untouchedScript, 'console.log("keep");');
  });
});
