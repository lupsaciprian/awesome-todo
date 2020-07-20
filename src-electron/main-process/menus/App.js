import { mainWindow } from "./../electron-main";
const isMac = process.platform === "darwin";

export default {
  label: "App",
  submenu: [
    ...(isMac
      ? [{ role: "close" }]
      : [
          {
            label: "Settings",
            click: () => {
              mainWindow.webContents.send("show-settings");
            },
            accelerator: isMac ? "Cmd+S" : "Ctrl+S"
          },
          { type: "separator" },
          { role: "quit" }
        ])
  ]
};
