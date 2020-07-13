import React from "react";
import styles from "./InfoByCase.module.css";
import classNames from "classnames";

class InfoByCase extends React.Component {
  render() {
    const { cases } = this.props;
    return (
      
      <div className={styles.card}>
        <div className={classNames(styles.new, 
          styles.info
          )}>
          <p className={classNames(styles.confirmCase)}>
            {" "}
            New confirm: <span> {cases.NewConfirmed} </span>
          </p>
          <p className={classNames(styles.deathCase)}>
            {" "}
            New death: <span> {cases.NewDeaths} </span>
          </p>
          <p className={classNames(styles.recoveredCase)}>
            {" "}
            New recovered: <span> {cases.NewRecovered} </span>
          </p>
        </div>{" "}
        <div className={classNames(styles.total, styles.info)}>
        <p className={classNames(styles.confirmCase)}>
            {" "}
            Total confirm: <span> {cases.TotalConfirmed} </span>
          </p>
          <p className={classNames(styles.deathCase)}>
            {" "}
            Total death: <span> {cases.TotalDeaths} </span>
          </p>
          <p className={classNames(styles.recoveredCase)}>
            {" "}
            Total recovered: <span> {cases.TotalRecovered} </span>
          </p>
        </div>{" "}
      </div>
    );
  }
}

export default InfoByCase;