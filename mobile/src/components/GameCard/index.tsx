import { LinearGradient } from 'expo-linear-gradient';

import { ImageBackground, TouchableOpacity, TouchableOpacityProps, ImageSourcePropType, Text } from 'react-native';

import { THEME } from '../../theme';

import { styles } from './styles';

export interface GameCardProps {
    id: string,
    title: string,
    _count: {
        Ad: number
    },
    bannerURL: string
}

interface Props extends TouchableOpacityProps {
    data: GameCardProps
}

export function GameCard({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <ImageBackground
                style={styles.cover}
                source={{uri: data.bannerURL}}
            >

                <LinearGradient
                    colors={THEME.COLORS.FOOTER}
                    style={styles.footer}
                >

                    <Text style={styles.name}>
                        {data.title}
                    </Text>

                    <Text style={styles.ads}>
                        {data._count.Ad} anúncios
                    </Text>

                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
}