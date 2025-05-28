import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const Navigate= useNavigate();

    const SignUp = () =>{
        Navigate('/Registration'); 
    }

    const Login = () =>{
        Navigate('/Login'); 
    }
  return (
    <section className="h-100 gradient-form mt-5">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-9">
            <div className="card rounded-3 bg-info text-black">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="./Admin/images/Home1.png"
                        style={{ width: 550 }}
                        alt="Inventory Management System"
                      />
                      <h4 className="mt-1 mb-2 pb-1 text-white">
                        Welcome to the Inventory Management System
                      </h4>
                      <p className="text-white mb-4">
                        Our Inventory Management System helps you manage and
                        track your inventory with ease. Whether you're running a
                        small store or a large warehouse, we provide tools to
                        help you keep track of stock levels, update items, and
                        generate reports efficiently.
                      </p>
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={()=>SignUp()}
                            className="btn btn-primary btn-lg"
                          >
                            Sign Up
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={()=>Login()}
                            className="btn btn-primary btn-lg"
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Home;
