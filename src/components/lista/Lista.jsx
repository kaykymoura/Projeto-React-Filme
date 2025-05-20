// Importa o CSS específico para o componente Lista
import "./Lista.css"

// Importa os ícones de editar e excluir
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"

// Componente funcional Lista que recebe props
const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            {/* Título dinâmico vindo por props */}
            <h1>{props.titulo}</h1>
            <hr />

            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            {/* Mostra ou esconde a coluna "Gênero" baseado na prop 'visible' */}
                            <th style={{ display: props.visible }}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Verifica se a lista existe e não está vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            // Mapeia cada item da lista para uma linha da tabela
                            props.lista.map((item) => (
                                <tr className="item_lista" key={item.idGenero}>
                                    {/* Nome do item */}
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    {/* Gênero (aqui está fixo como "Ação" — talvez precise ser dinâmico) */}
                                    <td data-cell="Gênero" style={{ display: props.visible }}>Ação</td>

                                    {/* Botão de edição (apenas ícone por enquanto) */}
                                    <td data-cell="Editar">
                                        <img src={Editar} alt="Imagem de uma caneta" />
                                    </td>

                                    {/* Botão de exclusão com função de deletar chamada via props */}
                                    <td data-cell="Excluir">
                                        <img
                                            src={Excluir}
                                            alt="Imagem de uma caixa de lixo"
                                            onClick={() => props.deletar(item.idGenero)} // Chama a função deletar com o ID
                                            style={{ cursor: "pointer" }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Exibe essa mensagem se a lista estiver vazia
                            <p>Nenhum gênero foi encontrado.</p>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;
