import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const auth = getAuth();


    const handleSignUp = () => {
        // Aqui você pode adicionar a lógica para registrar o usuário  if (name && email && password && password === confirmPassword) {  // Simulando o registro com sucesso 
        if (name && email && password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Registro bem-sucedido, você pode lidar com o usuário registrado aqui
                const user = userCredential.user;
                console.log('Usuário registrado com sucesso:', user);
                setSnackbarVisible(true);
            })
            .catch((error) => {
                // Se ocorrer um erro durante o registro, manipule-o aqui
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Erro ao registrar usuário:', errorMessage);
                setSnackbarVisible(false);
            });
        } else {
            console.error('Por favor, preencha todos os campos corretamente.');
        setSnackbarVisible(false);
    }
};

    return (
        <View style={styles.container}>
            <TextInput
                label="Nome"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />
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
            <TextInput
                label="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSignUp} style={styles.button}>
                Cadastrar
            </Button>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)} duration={3000}
            >
                Usuário cadastrado com sucesso!
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
export default SignUpScreen;
