import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, RadioButton, Text, Snackbar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Cadastro/types/User.type';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const SignInScreen = ({ navigation }: SignInScreenProps) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/ubsLogo.png')}
                style={styles.logo}
            />
            <View style={styles.radioGroup}>
                <RadioButton.Group>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Android value="Recepcionista" />
                        <Text style={styles.radioButtonText}>Recepcionista</Text>
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <RadioButton.Android value="Paciente" />
                        <Text style={styles.radioButtonText}>Paciente</Text>
                    </View>
                </RadioButton.Group>
            </View>
            <TextInput
                label="E-mail"
                mode="outlined"
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry={true}
                style={styles.input}
                right={<TextInput.Icon icon="eye" />}
            />
            <Button style={styles.textButton}>
                Esqueceu sua senha?
            </Button>
            <Button style={styles.textButton} onPress={() => navigation.navigate('Cadastro')}>
                Não tem uma conta? Cadastrar-se
            </Button>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('Noticias')}>
                Entrar
            </Button>
            <Snackbar
                visible={false}
                duration={3000}
            >
                Mensagem de exemplo
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logo: {
        width: 250,
        height: 100,
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        width: '100%',
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    textButton: {
        marginBottom: 5,
    },
    text: {
        marginBottom: 5,
    },
    radioGroup: {
        marginBottom: 20,
        width: '100%',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButtonText: {
        marginLeft: 10,
        fontSize: 18,
    },
});

export default SignInScreen;
