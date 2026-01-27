# Boost Library Download Fix Documentation

## Problem Description

When building the Android app, the build process was failing with the following error:

```
Execution failed for task ':expo-modules-core:prepareBoost'.
> Could not read /Users/.../node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz.
   > Not in GZIP format
```

## Root Cause

The issue occurred because:

1. **Outdated Download URL**: The Expo modules were trying to download the Boost C++ library from the old JFrog Artifactory URL:
   ```
   https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.gz
   ```

2. **URL Returns HTML Instead of File**: This URL now redirects to an HTML landing page instead of serving the actual GZIP archive file.

3. **Corrupted Download**: When Gradle attempted to download the file, it received an HTML document (approximately 11KB) instead of the expected 124MB GZIP compressed archive.

4. **Build Failure**: When the build process tried to extract the "GZIP" file, it failed because the file was actually HTML text, not a valid GZIP archive.

## Solution

The fix involved manually downloading the Boost library from the correct URL and placing it in the expected location:

### Step 1: Verify the Corrupted File

Check if the downloaded file is corrupted:
```bash
file node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz
```

Expected output if corrupted:
```
boost_1_76_0.tar.gz: HTML document text, ASCII text, with very long lines
```

### Step 2: Remove Corrupted Files

Delete the corrupted download directory:
```bash
rm -rf node_modules/expo-modules-core/android/build/downloads
```

### Step 3: Create Directory and Download from Correct URL

Create the downloads directory and download Boost from the correct archive URL:
```bash
mkdir -p node_modules/expo-modules-core/android/build/downloads
curl -L -o node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz \
  "https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.gz"
```

### Step 4: Verify the Download

Verify that the file is now a valid GZIP archive:
```bash
file node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz
ls -lh node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz
```

Expected output:
```
boost_1_76_0.tar.gz: gzip compressed data, last modified: Tue Apr 13 16:57:22 2021, max compression, from Unix, original size modulo 2^32 742205440
-rw-r--r--  1 user  staff   124M [date] boost_1_76_0.tar.gz
```

The file should be approximately **124MB** in size and recognized as a valid GZIP file.

## Complete Fix Script

Here's a complete script that can be run to fix the issue:

```bash
#!/bin/bash

# Navigate to project directory
cd /path/to/your/project

# Remove corrupted downloads
rm -rf node_modules/expo-modules-core/android/build/downloads

# Create directory
mkdir -p node_modules/expo-modules-core/android/build/downloads

# Download Boost from correct URL
echo "Downloading Boost library from archives.boost.io..."
curl -L -o node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz \
  "https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.gz"

# Verify download
if file node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz | grep -q "gzip compressed"; then
    echo "✓ Boost library downloaded successfully!"
    echo "File size: $(ls -lh node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz | awk '{print $5}')"
else
    echo "✗ Download failed or file is corrupted"
    exit 1
fi
```

## Why This Happens

1. **URL Migration**: Boost moved their download service from JFrog Artifactory to `archives.boost.io` in 2021, but some older build configurations still reference the old URL.

2. **Gradle Caching**: Gradle caches downloaded files. If a corrupted file was downloaded once, it may continue to use the cached corrupted version even after the URL issue is known.

3. **No Automatic Retry**: The Gradle download task doesn't automatically detect that an HTML page was downloaded instead of the expected file format.

## Prevention

To prevent this issue in the future:

1. **Update Expo Modules**: Keep Expo modules updated to versions that use the correct Boost download URL.

2. **Clean Build**: If you encounter this error, clean the build and downloads:
   ```bash
   cd android
   ./gradlew clean
   rm -rf ../node_modules/expo-modules-core/android/build/downloads
   ```

3. **Monitor Build Logs**: Watch for any "Not in GZIP format" errors during the download phase.

## Alternative Solutions

If the manual download doesn't work, you can also:

1. **Use SourceForge Mirror**:
   ```bash
   curl -L -o node_modules/expo-modules-core/android/build/downloads/boost_1_76_0.tar.gz \
     "https://sourceforge.net/projects/boost/files/boost/1.76.0/boost_1_76_0.tar.gz/download"
   ```

2. **Update Expo SDK**: Consider upgrading to a newer Expo SDK version that may have fixed this issue in the build configuration.

## Related Files

- **Build Configuration**: `node_modules/expo-modules-core/android/build.gradle`
- **Download Task**: Look for `downloadBoost` task in the build.gradle file
- **Download Location**: `node_modules/expo-modules-core/android/build/downloads/`

## Notes

- The Boost library is approximately 124MB, so the download may take a few minutes depending on your internet connection.
- This fix is temporary and will need to be reapplied if you delete `node_modules` or run a clean build that removes the downloads directory.
- The issue affects the first build after a clean install. Subsequent builds should work fine as long as the downloaded file remains intact.

## Date

This fix was applied on: January 23, 2026

## Author

Auto-generated documentation for the Boost library download fix.
