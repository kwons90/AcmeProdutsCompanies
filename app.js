const URL_Products = 'https://acme-users-api-rev.herokuapp.com/api/products';
const URL_Companies = 'https://acme-users-api-rev.herokuapp.com/api/companies';

const { Component } = React
const e = React.createElement;

const app = document.querySelector('#app')

const productsPromise = axios.get(URL_Products)
    .then(res => {
        console.log(res.data)
        return (res.data)
    })
const companiesPromise = axios.get(URL_Companies)
    .then(res => {
        console.log(res.data)
        return (res.data)
    })


class App extends Component {
    state = {
        products: [],
        companies: [],
        hash: 'products'
    }
    componentDidMount() {
        console.log(this.state.products)
        window.addEventListener('hashchange', (ev) => {
            this.setState({
                hash: window.location.hash.slice(1)
            })
        })
        Promise.all([productsPromise, companiesPromise])
            .then(response => {
                this.setState({
                    products: response[0],
                    companies: response[1]
                })
            })
    }
    render() {
        const { products, companies, hash } = this.state
        return e('div', null,
            e('h1', {className:'header'}, `Acme - We have ${products.length} Products and ${companies.length} Companies`),
            e('div', { className: 'itemContainer' },
                e(ProductList, { products, companies, hash }),
                e(CompaniesList, { products, companies, hash })))
    }
}

class ProductList extends Component {
    render() {
        const { products, companies } = this.props;
        const list = []
        for (let i in products) {
            console.log(products[i].name)
            list.push(e('li', { className: 'list' }, products[i].name))
        }
        return e('ul', null, [...list])
    }
}

class CompaniesList extends Component {
    render() {
        const { products, companies } = this.props;
        const list = []
        for (let i in companies) {
            console.log(companies[i].name)
            list.push(e('li', { className: 'list' }, companies[i].name))
        }
        return e('ul', null, [...list])
    }
}

ReactDOM.render(e(App), app, () => { console.log('I have rendered') });