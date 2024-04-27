import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase.config';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const handleLogin = () => {
        // Aqui você pode adicionar a lógica para autenticar o usuário  if (email && password) { 
        // Simulando o login com sucesso 
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Autenticação bem-sucedida, você pode lidar com o usuário autenticado aqui
                const user = userCredential.user;
                console.log('Usuário autenticado com sucesso:', user);
                setSnackbarVisible(true);
            })
            .catch((error) => {
                // Se ocorrer um erro durante a autenticação, manipule-o aqui
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Erro ao autenticar usuário:', errorMessage);
                setSnackbarVisible(false);
            });
        } else {
            // Exibe uma mensagem de erro caso o email ou a senha estejam em branco
            console.error('Por favor, insira um email e senha válidos.');
            setSnackbarVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                style={styles.input}
            />
            <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleLogin} style=
                {styles.button}>
                Login
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                Login realizado com sucesso!
            </Snackbar>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
    },
});
export default LoginScreen; 
