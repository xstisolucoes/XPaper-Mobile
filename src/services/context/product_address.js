import * as React from 'react';
import { ProdutoRua } from '../models';
import * as Storage from '../storage';
import { Recebimentos } from '../functions';

export const ProductAddressContext = React.createContext({
    productAddress: [],
});

const getCacheProductAddress = async () => {
    let productAddressJson = await Storage.getData('cacheProductAddress');

    let productAddress = []
    if (productAddressJson !== null && productAddressJson !== "" && productAddressJson) {
        productAddress = JSON.parse(productAddressJson);
    }

    return productAddress;
}

class ProductAddressContextProvider extends React.Component {
    constructor(props) {
        super(props);

        this.updateProductAddress = async (emp_codigo, pc_codigo) => {
            let data = await getCacheProductAddress();

            let response = await Recebimentos.getAllProductAddress(emp_codigo, pc_codigo);

            if (response.status == 200) {
                data = response.data.result[0];
            }
            
            await Storage.setData('cacheProductAddress', JSON.stringify(data));

            data.forEach((object, index) => {
                data[index] = new ProdutoRua(object);
            });

            this.setState({
                productAddress: data,
            });
        }

        this.setValue = (codigo, value) => {
            let data = this.state.productAddress;

            data.forEach((object) => {
                if (object['re_codigo'] == codigo) {
                    object['re_quantidade'] = value;
                }
            });

            this.setState({
                productAddress: data,
            });
        }

        this.state = {
            productAddress: [],
            functions     : {
                updateProductAddress: this.updateProductAddress,
                setValue            : this.setValue,
            }
        }
    }

    render() {
        return (
            <ProductAddressContext.Provider
                value={this.state}
            >
                {this.props.children}
            </ProductAddressContext.Provider>
        );
    }
}

export default ProductAddressContextProvider;