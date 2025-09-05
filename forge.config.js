const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: './src/assets/icons/win/icon.ico', // Use explicit .ico extension for Windows
    executableName: 'postboy',
    win32metadata: {
      CompanyName: 'Gaurav Saroha',
      ProductName: 'PostBoy',
      FileDescription: 'PostBoy',
      OriginalFilename: 'postboy.exe',
      InternalName: 'PostBoy',
      AppUserModelID: 'com.Ghost-xD.postboy',
    },
    extraResources: [
      './app-update.yml' // Include app-update.yml in the resources folder
    ]
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Ghost-xD',
          name: 'postboy'
        },
        prerelease: false,
        draft: false
      }
    }
  ],
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
