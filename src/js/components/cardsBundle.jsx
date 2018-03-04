import React from "react";

export default class CardsBundle extends React.Component {
    constructor() {
        super();

        this.state = {
            combinations: [],
            loading: true,
            error: false 
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("/api/v1/list-all-broadband")
        .then((response) => response.json())
        .then(({ combinations }) => {
            this.setState({ loading: false, combinations  });
        })
        .catch((err) => {
            console.error(err);
        });
    }

    render() {
        const { combinations, loading, error } = this.state;

        return(
            <ul className="plans-list">
                {
                    (loading) ?
                        <li>Carregando</li> :
                        (combinations.map(({ plan, price }, i) => <Plan key={i} plan={plan} price={price} />))
                }
            </ul>
        )
    }
} 

const Plan = ({ plan, price }) =>
    <li className="plans-list-item">
        <h3 className="plans-list-item-title">Plan</h3>
        <p className="plans-list-item-plan">{plan}</p>
        <p className="plans-list-item-price">R$ {price}</p>
    </li>