import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { ParagraphBold } from '../../styled-components/text';

interface ScannerProps {
  onCodeScanned: (type: string, data: string) => void;
  clearBarcodeData?: () => void;
  BarCodeScannerContainerStyle?: ViewStyle;
  BarCodeScannerReScanButtonStyle?: ViewStyle;
}


const Scanner: React.FC<ScannerProps> = ({ onCodeScanned, clearBarcodeData, BarCodeScannerContainerStyle, BarCodeScannerReScanButtonStyle }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();

    return () => {
      setScanned(false);
      setHasPermission(null);
    };
  }, []);

  if (hasPermission === null) {
    return (
      <View style={{ ...BarCodeScannerContainerStyle, justifyContent: 'center', alignItems: 'center' }}>
        <ParagraphBold>Acessando a câmera</ParagraphBold>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View style={{ ...BarCodeScannerContainerStyle, justifyContent: 'center', alignItems: 'center' }}>
        <ParagraphBold>Sem acesso a câmera</ParagraphBold>
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeEvent) => {
    setScanned(true);
    onCodeScanned(type, data);
  };

  return (
    <View style={{ ...BarCodeScannerContainerStyle }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity
          style={{ ...BarCodeScannerReScanButtonStyle }}
          onPress={() => {
            setScanned(false);
            if (clearBarcodeData) clearBarcodeData();
          }}>
          <Text style={styles.buttonText}>Re-Escanear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scanner;