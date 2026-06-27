#!/bin/bash
# Packages the AI Answer Readiness Scorer into a distributable zip file.
# Run from inside the ai-engine-optimization folder:
#   chmod +x build-dist.sh
#   ./build-dist.sh

set -e

DIST_NAME="ai-answer-scorer"
ZIP_NAME="${DIST_NAME}.zip"
STAGING_DIR="/tmp/${DIST_NAME}"

echo "Building distribution zip..."

# Clean up any previous staging
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR/src/checks"

# Copy everything needed to run the tool
cp START_HERE.html    "$STAGING_DIR/"
cp INSTALL.md         "$STAGING_DIR/"
cp package.json       "$STAGING_DIR/"
cp tsconfig.json      "$STAGING_DIR/"
cp src/index.ts       "$STAGING_DIR/src/"
cp src/crawler.ts     "$STAGING_DIR/src/"
cp src/extract.ts     "$STAGING_DIR/src/"
cp src/score.ts       "$STAGING_DIR/src/"
cp src/report.ts      "$STAGING_DIR/src/"
cp src/types.ts       "$STAGING_DIR/src/"
cp src/checks/crawlability.ts   "$STAGING_DIR/src/checks/"
cp src/checks/extractability.ts "$STAGING_DIR/src/checks/"
cp src/checks/structuredData.ts "$STAGING_DIR/src/checks/"
cp src/checks/markdownAccess.ts "$STAGING_DIR/src/checks/"
cp src/checks/freshness.ts      "$STAGING_DIR/src/checks/"
cp src/checks/pageExperience.ts "$STAGING_DIR/src/checks/"

# Create the zip from /tmp so the zip root is ai-answer-scorer/ (not a long path)
cd /tmp
rm -f "$OLDPWD/$ZIP_NAME"
zip -r "$OLDPWD/$ZIP_NAME" "$DIST_NAME" -x "*.DS_Store" "*.gitkeep"

echo ""
echo "Done! Distribution zip created:"
echo "  $(cd "$OLDPWD" && pwd)/$ZIP_NAME"
echo ""
echo "Contents:"
unzip -l "$OLDPWD/$ZIP_NAME" | grep -v "^Archive" | grep -v "^\-\-\-" | awk '{print "  " $NF}'
echo ""
echo "To distribute: send $ZIP_NAME to the user."
echo "Instructions for the user:"
echo "  1. Unzip the file (double-click on Mac/Windows)"
echo "  2. Open START_HERE.html in a browser and follow the steps"
