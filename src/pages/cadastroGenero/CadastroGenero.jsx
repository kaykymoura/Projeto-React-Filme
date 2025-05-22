import { useEffect, useState } from "react"; // Hooks do React
import api from "../../Services/services"; // Importação do serviço de API
import Swal from 'sweetalert2'; // Biblioteca para alertarrs bonitos

// Importação de componentes reutilizáveis:
import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    // Estados do componente:
    // Armazena o valor do input de gênero
    const [genero, setGenero] = useState("");
    // Armazena a lista de gêneros retornada da API
    const [listaGenero, setListaGenero] = useState([]);
    // Estado utilizado para armazenar o retorno da exclusão (pode ser útil para debug)
    const [deletaGenero, setDeletaGenero] = useState();

    // Função para exibir alertarrs personalizados com SweetAlert
    function alertar(icone, mensagem) {
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

    // Função para cadastrar um novo gênero
    async function cadastrarGenero(e) {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        if (genero.trim() != "") { // Verifica se o campo não está vazio
            try {
                await api.post("genero", { nome: genero }); // Envia o dado para a API
                alertar("success", "Cadastro realizado com sucesso!");
                setGenero(""); // Limpa o campo após o envio
                listarGenero(); // Ele atualiza a pagina sem precisar regarrega-la
            } catch (error) {
                alertar("error", "Erro! entre em contato com o suporte");
            }
        } else {
            alertar("error", "Preencha o campo vazio"); // Validação do campo vazio
        }
    }

    // Função que busca a lista de gêneros cadastrados
    async function listarGenero() {
        try {
            const resposta = await api.get("genero"); // Requisição GET para buscar os dados
            setListaGenero(resposta.data); // Atualiza o estado com a lista
            console.log(resposta.data); // Log para teste
        } catch (error) {
            console.log(error); // Exibe o erro no console se algo falhar
        }
    }

    // Função para remover um gênero pelo ID
    async function removerGenero(idGenero, warning) {
        try {
            const excluirGenero = await api.delete(`genero/${idGenero}`); // Requisição DELETE
            setDeletaGenero(excluirGenero.data); // Atualiza o estado com a resposta

            // Confirmação com SweetAlert
            Swal.fire({
                title: "Você tem certeza que quer excluir?",
                text: "Você não vai poder reverter isso!",
                icon: warning,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, deletar isso!"

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deletado!",
                        text: "Deletado com sucesso!",
                        icon: "success"
                    });
                }
            });
            listarGenero(); // Ele atualiza a pagina sem precisar regarrega-la
        } catch (error) {
            console.log(error); // Erro ao excluir
        }
    }

    // useEffect executa listarGenero ao montar o componente
    useEffect(() => {
        listarGenero(); // Carrega os dados quando o componente for renderizado
    }, [listaGenero]); // Correto: apenas na montagem

    async function editarGenero(genero) {

        const { value: novoGenero } = await Swal.fire({
            title: "Edite seu Genero",
            input: "text",
            inputLabel: "Novo genero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo nao pode estar vazio! ";
                }
            }
        });

        if (novoGenero) {
            try {
                
                await api.put(`genero/${genero.idGenero}`,
                    {nome: novoGenero} );
                Swal.fire(`o genero modificado 
                ${novoGenero}`);
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="Gênero"
                    funcCadastro={cadastrarGenero} // Passa a função de cadastro
                    valorInput={genero} // Valor atual do input
                    setValorInput={setGenero} // Atualiza o valor do input
                />
                <Lista
                    titulo="Lista dos Gêneros"
                    visible="none"
                    lista={listaGenero} // Passa a lista para o componente Lista
                    funcDeletar={removerGenero} // Passa a função de deletar
                    funcEditar={editarGenero} // Passa a funcao de editar
                />
            </main>
            <Footer />
        </>
    );
}

export default CadastroGenero;
