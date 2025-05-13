import { useEffect, useState } from "react";
import api from "../../Services/services"; // Mantendo apenas uma importação de api

//importar o sweet alert:
import Swal from 'sweetalert2'

// importação de componentes:
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    // nome do genero
    const [genero, setGenero] = useState("");

    function alerta(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }


    async function cadastrarGenero(e) {
        e.preventDefault();

        // verificar se o input está vindo vazio
        if (genero.trim() != "") {
            try {
                // cadastrar um genero: post
                await api.post("genero", { nome: genero });
                alerta("success", "Cadastro realizado com sucesso!")
                setGenero("");
            } catch (error) {
                alerta("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alerta("error", "Erro! Preencha o campo")
        }
    }


    // teste: validar o genero
    // useEffect(funcao, dependência)
    // useEffect(() => {
    //     console.log(genero);
    // }, [genero]);
    // fim do teste

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloPagina="Cadastrar Gênero"
                    visibilidade="none"
                    nomePlace="Gênero"
                    // atribuind a função:
                    funcCadastro={cadastrarGenero}
                    // atribuind o valor ao input:
                    valorInput={genero}
                    // atribuind a função que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    listaCadastro="Lista de Gêneros"
                    visibilidadeGenero="none"
                />
            </main>
            <Footer />
        </>
    );
};

export default CadastroGenero;
