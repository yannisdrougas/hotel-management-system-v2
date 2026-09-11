#define MyAppName "Hotel Management System"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Yannis Drougas"
#define MyAppURL "http://localhost:3000"

[Setup]
AppId={{A9B780E8-5B39-4A64-985F-74D49E875E93}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\Hotel Management System
DefaultGroupName=Hotel Management System
DisableProgramGroupPage=yes
OutputDir=output
OutputBaseFilename=HotelManagementSetup
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin
UninstallDisplayName={#MyAppName}

[Files]
Source: "..\backend\*"; DestDir: "{app}\backend"; Excludes: "target\*"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\frontend\*"; DestDir: "{app}\frontend"; Excludes: "node_modules\*,dist\*"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "..\database\HotelManagementDB.sql"; DestDir: "{app}\database"; Flags: ignoreversion
Source: "..\docker-compose.yml"; DestDir: "{app}"; Flags: ignoreversion
Source: "..\.env.example"; DestDir: "{app}"; DestName: ".env"; Flags: ignoreversion
Source: "StartHotelManagement.bat"; DestDir: "{app}\installer"; Flags: ignoreversion
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion
Source: "StopHotelManagement.bat"; DestDir: "{app}\installer"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\Hotel Management System"; Filename: "{app}\installer\StartHotelManagement.bat"; WorkingDir: "{app}"
Name: "{autodesktop}\Hotel Management System"; Filename: "{app}\installer\StartHotelManagement.bat"; WorkingDir: "{app}"; Tasks: desktopicon
Name: "{autoprograms}\Stop Hotel Management System"; Filename: "{app}\installer\StopHotelManagement.bat"; WorkingDir: "{app}"
Name: "{autodesktop}\Stop Hotel Management System"; Filename: "{app}\installer\StopHotelManagement.bat"; WorkingDir: "{app}"; Tasks: desktopicon

[Tasks]
Name: "desktopicon"; Description: "Create a desktop shortcut"; GroupDescription: "Additional shortcuts:"; Flags: unchecked

[Run]
Filename: "{app}\installer\StartHotelManagement.bat"; Description: "Start Hotel Management System"; Flags: postinstall nowait skipifsilent