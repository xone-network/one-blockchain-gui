!include "nsDialogs.nsh"

; Add our customizations to the finish page
!macro customFinishPage
XPStyle on

Var DetectDlg
Var FinishDlg
Var OneSquirrelInstallLocation
Var OneSquirrelInstallVersion
Var OneSquirrelUninstaller
Var CheckboxUninstall
Var UninstallOneSquirrelInstall
Var BackButton
Var NextButton

Page custom detectOldOneVersion detectOldOneVersionPageLeave
Page custom finish finishLeave

; Add a page offering to uninstall an older build installed into the one-blockchain dir
Function detectOldOneVersion
  ; Check the registry for old one-blockchain installer keys
  ReadRegStr $OneSquirrelInstallLocation HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\one-blockchain" "InstallLocation"
  ReadRegStr $OneSquirrelInstallVersion HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\one-blockchain" "DisplayVersion"
  ReadRegStr $OneSquirrelUninstaller HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\one-blockchain" "QuietUninstallString"

  StrCpy $UninstallOneSquirrelInstall ${BST_UNCHECKED} ; Initialize to unchecked so that a silent install skips uninstalling

  ; If registry keys aren't found, skip (Abort) this page and move forward
  ${If} OneSquirrelInstallVersion == error
  ${OrIf} OneSquirrelInstallLocation == error
  ${OrIf} $OneSquirrelUninstaller == error
  ${OrIf} $OneSquirrelInstallVersion == ""
  ${OrIf} $OneSquirrelInstallLocation == ""
  ${OrIf} $OneSquirrelUninstaller == ""
  ${OrIf} ${Silent}
    Abort
  ${EndIf}

  ; Check the uninstall checkbox by default
  StrCpy $UninstallOneSquirrelInstall ${BST_CHECKED}

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $DetectDlg

  ${If} $DetectDlg == error
    Abort
  ${EndIf}

  !insertmacro MUI_HEADER_TEXT "Uninstall Old Version" "Would you like to uninstall the old version of One Blockchain?"

  ${NSD_CreateLabel} 0 35 100% 12u "Found One Blockchain $OneSquirrelInstallVersion installed in an old location:"
  ${NSD_CreateLabel} 12 57 100% 12u "$OneSquirrelInstallLocation"

  ${NSD_CreateCheckBox} 12 81 100% 12u "Uninstall One Blockchain $OneSquirrelInstallVersion"
  Pop $CheckboxUninstall
  ${NSD_SetState} $CheckboxUninstall $UninstallOneSquirrelInstall
  ${NSD_OnClick} $CheckboxUninstall SetUninstall

  nsDialogs::Show

FunctionEnd

Function SetUninstall
  ; Set UninstallOneSquirrelInstall accordingly
  ${NSD_GetState} $CheckboxUninstall $UninstallOneSquirrelInstall
FunctionEnd

Function detectOldOneVersionPageLeave
  ${If} $UninstallOneSquirrelInstall == 1
    ; This could be improved... Experiments with adding an indeterminate progress bar (PBM_SETMARQUEE)
    ; were unsatisfactory.
    ExecWait $OneSquirrelUninstaller ; Blocks until complete (doesn't take long though)
  ${EndIf}
FunctionEnd

Function finish

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $FinishDlg

  ${If} $FinishDlg == error
    Abort
  ${EndIf}

  GetDlgItem $NextButton $HWNDPARENT 1 ; 1 = Next button
  GetDlgItem $BackButton $HWNDPARENT 3 ; 3 = Back button

  ${NSD_CreateLabel} 0 35 100% 12u "One has been installed successfully!"
  EnableWindow $BackButton 0 ; Disable the Back button
  SendMessage $NextButton ${WM_SETTEXT} 0 "STR:Let's Farm!" ; Button title is "Close" by default. Update it here.

  nsDialogs::Show

FunctionEnd

; Copied from electron-builder NSIS templates
Function StartApp
  ${if} ${isUpdated}
    StrCpy $1 "--updated"
  ${else}
    StrCpy $1 ""
  ${endif}
  ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function finishLeave
  ; Launch the app at exit
  Call StartApp
FunctionEnd

; Section
; SectionEnd
!macroend
