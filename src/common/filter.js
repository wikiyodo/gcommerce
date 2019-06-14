import React, {Component} from 'react';
import {GET_ATTRIBUTES, GET_ATTRIBUTES_VALUES, GET_DEPARTMENTS_CATEGORIES} from "../network/site";

export default class FilterPane extends Component{

    state = {
        filters : [],
        addedFilters: {}
    };

    componentDidMount(){
        this.getAllFilters();
    }

    getAllFilters = () => {
        let that = this;
        GET_ATTRIBUTES({}, (err, payload)=>{
            if(!err){
                that.setState({
                    filters: payload.body
                });
                for(let index in payload.body){
                    that.getAllFiltersValue(index, payload.body[index].attribute_id);
                }
            }else {
                setTimeout(2000, ()=>{
                    that.getCategories()
                });
            }
        });
    };


    appendFilterValue = (index, value)=>{
        let filters = this.state.filters;

        filters[index].values = value;
        this.setState({filters});
    };

    getAllFiltersValue = (index, attribute_id) => {
        let that = this;
        GET_ATTRIBUTES_VALUES({attribute_id}, (err, payload)=>{
            if(!err){
                that.appendFilterValue(index, payload.body);
            }else {
                setTimeout(2000, ()=>{
                    that.getCategories()
                });
            }
        });
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

        console.log(addedFilters);
        this.setState({
            addedFilters
        })
    };

    filterComponent = (filter, values = [])=>{
      switch (filter){
          case 'Color':
              return (
                  <div className="product-colors">
                      {
                          values.map((value, i)=>{
                              return (
                                  <div className="pc-each pointer" key={"prod-color"+value.value} onClick={()=>this.addFilter(filter, value.value)}>
                                      <div className="pce-s" style={{backgroundColor: value.value}}></div>
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
                                  <div className="ps-each pointer" key={"prod-sizes"+value.value} onClick={()=>this.addFilter(filter, value.value)}>
                                      {value.value}
                                  </div>
                              )
                          })
                      }
                  </div>
              );
          case 'Price':
              return (
                  <div className="product-range">
                      <div type="number"  id="ex12b"></div>
                      <div className="range-slider-text">
                          <div className="min-sk3">£3</div>
                          <div className="max-sk3">£100</div>
                      </div>
                  </div>
              );
          case 'Brand':
              return (
                  <div className="product-brand">
                      <label className="c-check">
                          Arbercrombie
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                      </label>
                      <label className="c-check">
                          Fitch
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                      </label>
                      <label className="c-check">
                          Adidas Originals
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                      </label>
                      <label className="c-check">
                          ASOS
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                      </label>
                      <label className="c-check">
                          Cheap Monday
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                      </label>
                  </div>
              );
          default: return <span />;
      }
    };

    renderFilters(){
        return this.state.filters.map((filter, i)=>{
           return (
               <div className="each-filter" key={"filter"+filter.name}>
                   <div className="ef-title">
                       {filter.name}
                   </div>
                   {
                       this.filterComponent(filter.name, filter.values)
                   }
               </div>
           ) ;
        });
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
            <div className="card card-01">
                <div className="card-header">
                    <h4 className="ch-title">Filter 486 items</h4>
                    { this.renderFilteredItems() }
                </div>
                <div className="card-body">
                    <div className="filters-01">
                        {this.renderFilters()}
                    </div>
                </div>
                <div className="card-footer">
                    <div className="bx-21">
                        <button className="btn  btn-gr btn-pink-red">Apply</button>
                        <a className="btn btn-default font font-small font-pink"><i className="fa fa-close"></i> Clear All</a>
                    </div>
                </div>
            </div>
        );
    }
}