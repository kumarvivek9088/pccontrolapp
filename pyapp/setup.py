import sys
from cx_Freeze import setup, Executable


# Dependencies are automatically detected, but it might need fine tuning.
build_exe_options = {
    "excludes":['cv2'],
    "packages":['win32gui','pyttsx3'],
    "includes":['win32gui','pyttsx3'],
    "zip_include_packages": ["encodings", "PySide6"],
}

# base="Win32GUI" should be used only for Windows GUI app
base = "Win32GUI" if sys.platform == "win32" else None

setup(
    name="pccontrolapp",
    version="0.1",
    description="pc control software",
    options={"build_exe": build_exe_options},
    executables=[Executable("pccontrolapp.py", base=base)],
)