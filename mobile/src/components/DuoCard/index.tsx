// Native
import { TouchableOpacity, View, Text } from 'react-native';

// Components
import { DuoInfo } from '../DuoInfo';

// CSS
import { styles } from './styles';

// Theme
import { THEME } from '../../theme';

// phosphor
import { GameController } from 'phosphor-react-native';


export interface DuoCardProps {
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;
}

interface Props {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value={data.name}
            />
            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} anos`}
            />
            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />
            <DuoInfo
                label='Chamada de áudio?'
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController
                    style={styles.button}
                />

                <Text
                    style={styles.buttonTitle}
                >
                    Conectar
                </Text>

            </TouchableOpacity>

        </View>
    );
}