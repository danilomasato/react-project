import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container } from "../components";
import { Card } from "../components";
import {
  getBrand,
  getModel,
  getVersion,
  getVehicles
} from "../actions";
import "./Home.css";
import "../components/Carousel.css";

const Home = ({
  data,
  brand,
  model,
  version,
  vehicles,
  getModel,
  getVersion
}) => {

    const [vehiclesList, setVehiclesList] = useState([]);
    const [modelDefault, setModelDefault] = useState('Todos');
    const { register, handleSubmit } = useForm();
    const [opt, setOpt] = useState(true);
    const [menu, setMenu] = useState([{
        title: 'Home',
        action: '/'
    }]);

    const handleBrand = id => {
        // setModelDefault(id);
        getModel(id);
    }

    const handleModel = id => {
        getVersion(id);
    }

    function removeDiacritics (text){       
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text                 
    }

    const onSubmit = data => {
        console.log('onSubmit----->', data)

        const fromToBrand = brand.filter(i => i.ID === parseInt(data.brand))[0]?.Name;
        const fromTomModel = model.filter(i => i.ID === parseInt(data.model))[0]?.Name;
        // debugger
        setVehiclesList((vehiclesList.length === vehicles.length ? vehiclesList : vehicles).filter(item => {
            if(data.brand !== "" && data.model == "Todos") {
                return removeDiacritics(item.Make).indexOf(removeDiacritics(fromToBrand).trim()) > -1
            } 

            if(data.brand !== "") {
                return removeDiacritics(item.Make).indexOf(removeDiacritics(fromToBrand).trim()) > -1 && removeDiacritics(item.Model).indexOf(removeDiacritics(fromTomModel).trim()) > -1 
            }
        }));
    }

    //first load
    useEffect(() => {
        if (vehicles.length > 0) {
            setVehiclesList(vehicles);
        }
    }, [vehicles])

    //get version.
    useEffect(() => {
        if (model.length > 0) {
            getVersion(model[0].ID);
        }
    }, [model])

  return (
    <React.Fragment>
        <Container menu={menu}>
            
            <div id="search">
                <ul className="search-tab">
                    <li>
                        <i className="search-tab__icon" alt="comprar carro" />
                        <span className="search-tab__text-small">Comprar</span>
                        <span className="search-tab__text-highlight">Carros</span>
                    </li>
                </ul>

                <div className="search-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="search-form">
                        <fieldset className="group">
                            <label>Marca: </label>
                            <select name="brand" id="brand" {...register('brand')} onChange={e => {handleBrand(e.target.value)}} onFocus={()=> {setOpt(!opt)}}>
                                <React.Fragment>
                                    { opt ? <option value="marca"> Todas </option> : null }
                                    {brand.map(i => {
                                        return (
                                            <option key={i.ID} value={i.ID}> {i.Name} </option>
                                        )
                                    })}
                                </React.Fragment>
                            </select>
                        </fieldset>
                        <fieldset className="group">
                            <label>Modelo: </label>
                            <select name="model" id="model" {...register('model')} onChange={e => {handleModel(e.target.value)}}>
                                <option value={modelDefault}> {modelDefault} </option>
                                {model.length > 0 &&
                                    <React.Fragment>
                                        {model.map(i => {
                                            return (
                                                <option key={i.ID} value={i.ID}> {i.Name} </option>
                                            )
                                        })}
                                    </React.Fragment>
                                }
                            </select>
                        </fieldset>
                        <fieldset className="group">
                            <label>Versão: </label>
                            <select name="version" id="version" {...register('version')} onChange={e => {}}>
                                {version.length > 0 ?
                                    <React.Fragment>
                                        {version.map(i => {
                                            return (
                                                <option key={i.ID} value={i.ID}> {i.Name} </option>
                                            )
                                        })}
                                    </React.Fragment>
                                 : <option value="versão"> Todas </option>
                                }
                            </select>
                        </fieldset>

                        <fieldset className="group">
                            <input type="submit" className="btn" />
                        </fieldset>
                    </form>
                </div>

                <div className="search-list">
                    {vehiclesList.map(i => {
                        return (
                            <Card key={i.ID} vehicle={i}/>
                        )
                    })}
                </div>
            </div>
        </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  data: state.home,
  brand: state.home.brand,
  model: state.home.model,
  version: state.home.version,
  vehicles: state.home.vehicles
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBrand: dispatch(getBrand()),
      getModel: getModel,
      getVersion: getVersion,
      getVehicles: dispatch(getVehicles())
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Home)
);
