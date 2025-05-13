import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro tituloPagina="Cadastrar Filme"
                    nomePlace="Filme"
                />
                <Lista listaCadastro="Lista de filmes" />
            </main>
            <Footer />
        </>
    )
}

export default CadastroFilme;