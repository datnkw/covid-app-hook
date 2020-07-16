import React from "react";
import Styles from "./InfoByCase.module.css";
import classNames from "classnames";

function InfoByCase(props){
  
    const { cases } = props;
    return (
      
      <div className={Styles.card}>
        <div className={classNames(Styles.new, 
          Styles.info
          )}>
          <p className={classNames(Styles.confirmCase)}>
            {" "}
            New confirm: <span> {cases.NewConfirmed} </span>
          </p>
          <p className={classNames(Styles.deathCase)}>
            {" "}
            New death: <span> {cases.NewDeaths} </span>
          </p>
          <p className={classNames(Styles.recoveredCase)}>
            {" "}
            New recovered: <span> {cases.NewRecovered} </span>
          </p>
        </div>{" "}
        <div className={classNames(Styles.total, Styles.info)}>
        <p className={classNames(Styles.confirmCase)}>
            {" "}
            Total confirm: <span> {cases.TotalConfirmed} </span>
          </p>
          <p className={classNames(Styles.deathCase)}>
            {" "}
            Total death: <span> {cases.TotalDeaths} </span>
          </p>
          <p className={classNames(Styles.recoveredCase)}>
            {" "}
            Total recovered: <span> {cases.TotalRecovered} </span>
          </p>
        </div>{" "}
      </div>
    );
  
}

export default InfoByCase;