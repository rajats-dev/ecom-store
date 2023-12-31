import React, { Fragment, useCallback, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CartContext } from "../../context/Context";

let id = localStorage.getItem("id");
console.log(id);

const Root = (props) => {
  const { dispatch } = CartContext();

  const fetchmethod = useCallback(async () => {
    let cartitem = [];
    try {
      const res = await fetch(
        `https://auth-app-ff8fe-default-rtdb.firebaseio.com/${id}.json`
      );

      const data = await res.json();

      for (const key in data) {
        cartitem.push({
          cryticid: key,
          id: data[key].id,
          image: data[key].image,
          price: data[key].price,
          title: data[key].title,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
    dispatch({ type: "USER_REFRESHED", payload: cartitem });
  }, [dispatch]);

  useEffect(() => {
    fetchmethod();
  }, [fetchmethod]);

  return (
    <Fragment>
      <Header />
      <main style={{ minHeight: "100%" }}>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Root;
