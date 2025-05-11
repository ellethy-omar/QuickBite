import React, { useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

interface SmartImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  svgStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const SmartImage: React.FC<SmartImageProps> = ({ uri, style, svgStyle, onPress }) => {
  const [isSvg] = useState<boolean>(uri?.toLowerCase().endsWith('.svg'));
  const [svgXmlData, setSvgXmlData] = useState<string | null>(null);

  useEffect(() => {
    if (isSvg) {
      fetch(uri)
        .then((res) => res.text())
        .then((text) => setSvgXmlData(text))
        .catch(() => setSvgXmlData(null));
    }
  }, [uri, isSvg]);

  const { width, height } = (svgStyle as ViewStyle) || {};

  if (isSvg) {
    return svgXmlData ? (
      <SvgXml onPress={onPress} xml={svgXmlData} width={width ? String(width) : '100%'} height={height ? String(height) : '30%'}/>
    ) : null;
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Image source={{ uri }} style={style} resizeMode="cover" />
    </TouchableOpacity>
  );
};

export default SmartImage;
