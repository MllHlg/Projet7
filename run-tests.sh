#!/bin/bash

TARGET=$1
REPORT_DIR="test-results"

mkdir -p $REPORT_DIR

if [ "$TARGET" == "back" ]; then
    rm -f $REPORT_DIR/back-test-results.xml

    cd back
    chmod +x gradlew
    ./gradlew test
    EXIT_CODE=$?
    
    find build/test-results/test -name "*.xml" -exec cp {} ../$REPORT_DIR/back-test-results.xml \;
    exit $EXIT_CODE

elif [ "$TARGET" == "front" ]; then
    rm -f $REPORT_DIR/front-test-results.xml

    cd front
    npm run test -- --watch=false --browsers=ChromeHeadless
    EXIT_CODE=$?
    
    cp front-test-results.xml ../$REPORT_DIR/ 2>/dev/null
    exit $EXIT_CODE

else
    echo "Erreur : Vous devez indiquer 'front' ou 'back'"
    exit 1
fi