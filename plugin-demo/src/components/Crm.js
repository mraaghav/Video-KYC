import React from 'react';

const crmStyles = {
    marginLeft: '0.2rem',
    padding: '0.5rem',
    background: '#ffffff',
    height: '100%'
};

const headerStyles = {
    fontWeight: '600',
    fontSize: '1.6rem'
};

const custInfoStyles = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto'
};

const titleStyles = {
    color: '#a6a6a6',
    fontWeight: '500'
};

const hrStyle = {
    border: '1px solid rgb(166, 166, 166)'
}

const actionHistoryStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginTop: '2rem'
}

const selectStyle = {
    marginTop: '0.7rem',
    fontSize: '1rem',
    width: '200px',
    padding: '0.5rem',
}

const buttonStyle = {
    width: '210px',
    fontSize: '1rem',
    border: 'none',
    background: '#00BA51',
    marginTop: '0.5rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem'
}

const historyLogStyle = {
    marginTop: '0.3rem',
    padding: '0.5rem',
    boxShadow: '0 0 25px 0 rgb(72, 94, 116, 0.3)',
    background: '#00BA51',
    opacity: '0.9'
}

class Crm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            customerStatus: '',
            email:  '',
            history: [],
            phone: '',
            identity: this.props.identity
        };
    }

    componentDidMount() {
        fetch('https://sienna-kakapo-9904.twil.io/crm_info', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
        .then(json => {
            this.setState({
                address: json.address,
                customerStatus: json.customerStatus,
                email: json.email,
                history: [...json.history],
                phone: json.phone
            })
        })
    }

    render() {
        return (
            <div style={crmStyles}>
                <div className="header" style={{fontWeight: '600', fontSize: '1rem'}}>Customer Info</div>
                <hr style={hrStyle} />
                <div className="cust-name" style={headerStyles}>{this.props.identity}</div>
                <div className="cust-info" style={custInfoStyles}>
                    <div className="row1">
                        <div style={{marginTop: '0.5rem'}}>
                            <div style={titleStyles}>CUSTOMER STATUS</div>
                            <div>{this.state.customerStatus}</div>
                        </div>
                        <div style={{marginTop: '2rem'}}>
                            <div style={titleStyles}>EMAIL</div>
                            <div>{this.state.email}</div>
                        </div>
                    </div> 

                    <div className="row2">
                        <div style={{marginTop: '0.5rem'}}>
                            <div style={titleStyles}>ADDRESS</div>
                            <div>{this.state.address}</div>
                        </div>
                        <div style={{marginTop: '2rem'}}>
                            <div style={titleStyles}>PHONE</div>
                            <div>{this.state.phone}</div>
                        </div>
                    </div>

                    <div className="row3">
                        <img src="https://sienna-kakapo-9904.twil.io/assets/customer-service.jpg" style={{width: '100px', height: '100px', borderRadius: '50%', marginTop: '1rem'}} ></img>
                    </div>
                </div>
                <hr style={hrStyle}/>

                <div className="actions-history" style={actionHistoryStyle}>
                    <div>
                        <div style={titleStyles} >ACTIONS</div>
                        <select style={selectStyle}>
                            <option>Call customer</option>
                            <option>Email customer</option>
                            <option>Update details</option>
                        </select>

                        <div style={{marginTop: '1rem'}}>
                            <textarea 
                            style= {{
                                width: '200px',
                                height: '250px'
                            }} />
                        </div>
                        <button style={buttonStyle}>Send</button>
                    </div>

                    <div>
                        <div style={titleStyles}>CUSTOMER HISTORY</div>
                        <hr />
                        <div>
                            {
                                this.state.history.map((history, index) => {
                                    return <div className="history" key={index} style={historyLogStyle}>{history}</div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Crm;
