import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro tituloPagina="Cadastrar Gênero "
                    visibilidade="none"
                    nomePlace="Gênero"
                    
                />
                <Lista
                    listaCadastro="Lista de Gênero"
                    visibilidadeGenero ="none" />
            </main>
            <Footer />
        </>
    )
}
export default CadastroGenero;