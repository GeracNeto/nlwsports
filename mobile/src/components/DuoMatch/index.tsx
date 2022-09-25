// Native
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// Hooks
import { useState } from 'react';

// CSS
import { styles } from './styles';

// Expo
import { MaterialIcons } from '@expo/vector-icons'

// Theme
import { THEME } from '../../theme';

// phosphor
import { CheckCircle } from 'phosphor-react-native'

// Components
import { Heading } from '../Heading'

// Clipboard
import * as ClipBoard from 'expo-clipboard'

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {

    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        await ClipBoard.setStringAsync(discord)

        Alert.alert('Discord copiado!', 'Agora é só jogar!')
        setIsCopping(false)
    }

    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeIcon}
                    >
                        <MaterialIcons
                            name='close'
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading
                        title="Let's play"
                        subtitle="Agora é só começar a jogar!"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text
                        style={styles.label}
                    >
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        onPress={handleCopyDiscordToClipboard}
                        style={styles.discordButton}
                        disabled={isCopping}
                    >
                        <Text
                            style={styles.discord}
                        >
                            {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}