import React, {Component} from 'react';
import {GET_ATTRIBUTES, GET_ATTRIBUTES_VALUES, GET_DEPARTMENTS_CATEGORIES} from "../network/site";
import { GET_PRODUCT_ATTRIBUTES } from '../network/products';
export default class ProductAttr extends Component{

    state = {
        filters : [],
        addedFilters: {}
    };

    componentDidMount(){
        this.getAllFilters();
    }

    getAllFilters = () => {
        let that = this;
        let {product_id} = this.props;
        GET_PRODUCT_ATTRIBUTES({product_id}, (err, payload)=>{
            if(!err){
                that.setState({
                    filters: payload.body
                });
            }else {
                setTimeout(2000, ()=>{
                    that.getAllFilters()
                });
            }
        });
    };


    appendFilterValue = (index, value)=>{
        let filters = this.state.filters;

        filters[index].values = value;
        this.setState({filters});
    };

    onAddFilters = (filters)=>{
        if(this.props.onAddFilters)
            this.props.onAddFilters(filters)
    };

    addFilter = (filter, value)=>{
        let filters = this.state.addedFilters[filter] || [];
        let addedFilters = this.state.addedFilters;

        if(!filters.includes(value))
            filters.push(value);
        else{
            let pos = filter.indexOf(value);
            let bkFilters = JSON.parse(JSON.stringify(filters));
            filters = [];
            bkFilters.forEach((e, i)=>{
               if(i == pos) return;
               filters.push(e);
            });
        }

        addedFilters[filter] = filters;

        this.setState({
            addedFilters
        });
        this.onAddFilters(addedFilters);
    };

    filterComponent = (filter, values = [])=>{
      switch (filter){
          case 'Color':
              return (
                  <div className="product-colors">
                      {
                          values.map((value, i)=>{
                              return (
                                  <div className="pc-each pointer" key={"prod-color"+value} onClick={()=>this.addFilter(filter, value)}>
                                      <div className="pce-s" style={{backgroundColor: value}}></div>
                                  </div>
                              )
                          })
                      }
                  </div>
              );
          case 'Size':
              return (
                  <div className="product-sizes">
                      {
                          values.map((value, i)=>{
                              return (
                                  <div className="ps-each pointer" key={"prod-sizes"+value} onClick={()=>this.addFilter(filter, value)}>
                                      {value}
                                  </div>
                              )
                          })
                      }
                  </div>
              );
          default: return <span />;
      }
    };

    groupFilters = (filters)=>{
        let grouped = {};
        filters.forEach((filter, i)=>{
            if(grouped[filter.attribute_name])
                grouped[filter.attribute_name].push(filter.attribute_value);
            else{
                grouped[filter.attribute_name] = [filter.attribute_value];
            }
        });
        return grouped;
    };

    renderFilters(){
        let filters = this.groupFilters(this.state.filters);
        let returnable = [];
        for(let i in filters){
            let filter = filters[i];
               returnable.push(<div className="each-filter" key={"filter"+filter.name}>
                   <div className="ef-title">
                       {i}
                   </div>
                   {
                       this.filterComponent(i, filter)
                   }
               </div>);
        }
        return returnable.map((e, i)=>e);
    }

    renderFilteredItems = ()=>{
        return (
            <div className="selected-options">
                {
                    (()=>{
                        let dom = [];
                        for(let filterName in this.state.addedFilters){
                            let filters = this.state.addedFilters[filterName];
                            dom.push(
                                <div className="so-each" key={"so-each"+filterName}>
                                    <i className="fa fa-close"></i>
                                    <span className="mgl">{ filterName }:
                                        {
                                            filters.map((e, i)=>{
                                              return <strong className="mgl2" key={"so-each-mg12"+e}>{ e }{i === filters.length-1 ? '' : ', '}</strong>;
                                            })
                                        }
                                    </span>
                                </div>
                            );
                        }

                        return dom.map((e, i)=>{
                            return e;
                        })
                    })()
                }
            </div>
        );
    };

    render(){
        return (
            <span>
                {this.renderFilters()}
                {this.renderFilteredItems()}
            </span>
        );
    }
}