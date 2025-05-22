import "./Lista.css"
import Editar from "../../assets/img/pen-to-square-solid.svg"
import Excluir from "../../assets/img/trash-can-regular.svg"

const Lista = (props) => {
    return (
        <section className="layout_grid listagem">
            <h1>{props.titulo}</h1>
            <hr />

            <div className="tabela">
                <table>
                    <thead>
                        <tr className="table_cabecalho">
                            <th>Nome</th>
                            <th style={{ display: props.visible }}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Verificar se alista esta vindo vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            props.lista.map((item) => (
                                <tr className="item_lista" key={props.tipoLista == "genero" ? item.idGenero : item.idFilme}>
                                    <td data-cell="Nome" >
                                          {props.tipoLista == "genero" ? item.nome : item.titulo}
                                    </td>
                                    <td data-cell="Gênero" style={{ display: props.visible }}>{item.genero?.nome}</td>
                                    <td data-cell="Editar"><img src={Editar} alt="Imagem de uma caneta" /></td>
                                    <td data-cell="Excluir"><img src={Excluir} alt="Imagem de uma caixa de lixo" onClick={() => props.deletar(item.idGenero)} style={{ cursor: "pointer" }} /></td>
                                </tr>
                            ))
                        ) :
                            (
                                <p>Nenhum gênero foi encontrado.</p>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Lista;