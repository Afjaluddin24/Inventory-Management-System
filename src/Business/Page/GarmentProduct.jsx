import React, { useEffect, useState, useRef } from 'react';
import { EnterpriseSchema } from '../schemas';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import BreadCrumbs from './BreadCrumbs';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { fetchData, postData, deleteRequest } from '../Repositories/APIRequest';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Enterprise() {
    const [loading, setLoading] = useState(false);
    const [EnterpriseId, setEnterpriseId] = useState(0);
    const [Enterprises, setEnterprises] = useState([]);
    const [initialValues, setinitialValues] = useState({
        "txtEnterprise": "",
        "txtAddress": "",
        "txtContact": "",
        "txtEmail": "",
        "txtWebUrl": "",
        "txtEstablishDate": "",
        "drpType": "",
        "txtOwner": "",
        "txtGst": "",
        "txtStatus": "",
        "txtBankName": "",
        "txtAcNo": "",
        "txtIFSC": "",
        "txtBranch": ""

    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const resultResponse = await fetchData("Enterprise/AllEnterprise");
            console.log(resultResponse);
            if (resultResponse.status === "OK") {
                setEnterprises(resultResponse.result);
            }
        } catch (err) {
            console.log(err);
            toast.error("Error fetching data");
        }
    };

    const fetchDetail = async (Id) => {
        try {
            const resultResponse = await fetchData(`Enterprise/Details/${Id}`);
            console.log(resultResponse);
            if (resultResponse.Status === "OK") {
                const EnterpriseDetail = resultResponse.Result;
                setEnterpriseId(EnterpriseDetail.id);
                setinitialValues({
                    txtEnterprise: EnterpriseDetail.name,
                    txtAddress: EnterpriseDetail.address,
                    txtContact: EnterpriseDetail.contactNo,
                    txtEmail: EnterpriseDetail.email,
                    txtWebUrl: EnterpriseDetail.website_url,
                    txtEstablishDate: EnterpriseDetail.established_date,
                    drpType: EnterpriseDetail.industry_type,
                    txtOwner: EnterpriseDetail.owner_Name,
                    txtGst: EnterpriseDetail.gstNo,
                    txtStatus: EnterpriseDetail.status,
                    txtBankName: EnterpriseDetail.bank_Name,
                    txtAcNo: EnterpriseDetail.aC_No,
                    txtIFSC: EnterpriseDetail.iFSC,
                    txtBranch: EnterpriseDetail.branch
                });

                openModal();  // Call modal opening function
            }
        } catch (err) {
            console.log(err);
            toast.error("Error fetching data");
        }
    };


    const deleteEnterprise = async (Id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                console.log(Id);
                const deleteData = await deleteRequest(`Enterprise/Remove/${Id}`);
                if (deleteData.status === "OK") {
                    toast.success("Deleted successfully");
                    getData(); // Refresh category list
                } else {
                    toast.error("Error deleting Enterprise");
                    getData();
                }
            } catch (err) {
                console.log(err);
                getData();
            }
        }
    };

    const cancelForm = () => {
        setEnterpriseId(0);
        formik.resetForm(); // Reset form fields to initial state
    };

    const modalRef = useRef(null);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues,
        validationSchema: EnterpriseSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const requestJSON = {
                "Id": EnterpriseId,
                "Name": values.txtEnterprise,
                "Address": values.txtAddress,
                "ContactNo": values.txtContact,
                "Email": values.txtEmail,
                "Website_url": values.txtWebUrl,
                "Established_date": values.txtEstablishDate,
                "Industry_type": values.drpType,
                "Owner_Name": values.txtOwner,
                "GstNo": values.txtGst,
                "Status": values.txtStatus,
                "Bank_Name": values.txtBankName,
                "AC_No": values.txtAcNo,
                "IFSC": values.txtIFSC,
                "Branch": values.txtBranch,
                "LogDate": null
            };

            console.log(requestJSON);

            try {
                const result = await postData(requestJSON, "Enterprise/NewEnterprise");
                console.log(result);
                if (result.status === "OK") {
                    toast.success(" saved successfully!");
                    getData();
                    cancelForm();

                } else {
                    toast.error("Enterprise already exists !!! ");
                }
            } catch (err) {
                toast.error("Something went wrong !!!")
            } finally {
                setLoading(false);
            }
        },
    });

    const setStatus = (Value) => {
        formik.setFieldValue("txtStatus", (Value ? "Active" : "In-Active"));
    };

    const setIndustirialType = (Value) => {
        formik.setFieldValue("drpType", Value);
    };

    const openModal = () => {
        const modal = new window.bootstrap.Modal(modalRef.current);
        modal.show();
    };

    return (
        <>
            <div id="layout-wrapper">
                <BreadCrumbs Title="Enterprise" />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-12 mb-4">
                                        <button type="button" className="btn btn-info btn-lg" onClick={openModal}>
                                            <i className='fas fa-add text-white'></i>
                                            <b className='text-white'>Add</b>
                                        </button>
                                    </div>
                                    <DataTable value={Enterprises} paginator showGridlines rows={10} loading={loading} dataKey="id" emptyMessage="No Enterprise found.">
                                        <Column header="S.No" body={(rowData, { rowIndex }) => rowIndex + 1} style={{ width: '5%' }} />
                                        <Column header="Enterprise Info" style={{ minWidth: '20rem' }}
                                            body={(rowData) => {
                                                const formattedDate = rowData.established_date
                                                    ? new Date(rowData.established_date).toLocaleDateString('en-GB')
                                                    : 'N/A'; // Handle empty dates
                                                return (
                                                    <>
                                                        <strong>{rowData.name}</strong> <br />
                                                        <small className="text-muted">GST: {rowData.gstNo}</small> <br />
                                                        <small>Establish Date: {formattedDate}</small>
                                                    </>
                                                );
                                            }}
                                        />
                                        <Column field="owner_Name" header="Owner Name" style={{ minWidth: '10rem' }} />
                                        <Column header="Contact Details" style={{ minWidth: '15rem' }}
                                            body={(rowData) => (
                                                <>
                                                    <strong>{rowData.contactNo}</strong> <br />
                                                    <small className="text-muted">{rowData.email}</small>
                                                </>
                                            )}
                                        />
                                        <Column header="Bank Details" style={{ minWidth: '20rem' }}
                                            body={(rowData) => (
                                                <>
                                                    <strong>{rowData.bank_Name}</strong> <br />
                                                    <small>AC No: {rowData.aC_No}</small> <br />
                                                    <small>Branch: {rowData.branch}</small> <br />
                                                    <small>IFSC: {rowData.ifsc}</small>
                                                </>
                                            )}
                                        />
                                        <Column style={{ minWidth: '7rem' }} header="Actions"
                                            body={(rowData) => (
                                                <>
                                                    <button type='button' className='btn btn-danger btn-sm'
                                                        onClick={() => deleteEnterprise(rowData.id)}>
                                                        <i className='fas fa-trash'></i>
                                                    </button>
                                                </>
                                            )}
                                        ></Column>
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

            <form className="modal fade" ref={modalRef} tabIndex="-1" onSubmit={formik.handleSubmit}>
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add Enterprise</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className='col-md-12 mb-2'>
                                            <b>Enterprise Name</b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtEnterprise}</strong>
                                            <InputText className='form-control' value={formik.values.txtEnterprise}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Enterprise Name" id="txtEnterprise" />
                                        </div>
                                        <div className='col-md-12 mb-2'>
                                            <b>Owner Name </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtOwner}</strong>
                                            <InputText className='form-control' value={formik.values.txtOwner}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Owner Name" id="txtOwner" onKeyDown={(e) => {
                                                    if (e.key.match(/\d/)) {  // Blocks number keys
                                                        e.preventDefault();
                                                    }
                                                }} />
                                        </div>
                                        <div className='col-md-7 mb-2'>
                                            <b>WebSite Url </b>
                                            <strong className="text-danger">*</strong>
                                            <InputText className='form-control' id='txtWebUrl' placeholder='XXX.xxxxxx.Com'
                                                value={formik.values.txtWebUrl}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-5 mb-2'>
                                            <b>Establish Date </b>
                                            <strong className="text-danger">*</strong>
                                            <input type='date'
                                                className='form-control'
                                                id='txtEstablishDate'
                                                placeholder='Establish Date'
                                                value={formik.values.txtEstablishDate}
                                                max={new Date().toISOString().split("T")[0]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-7 mb-2'>
                                            <b>Industry Type </b>
                                            <strong className="text-danger">*</strong>
                                            <select id='drpType' onChange={(event) => setIndustirialType(event.target.value)} className='form-select'>
                                                <option>Select Industry Type</option>
                                                <option value='Contraction'>Contraction</option>
                                                <option value='IT'>IT</option>
                                            </select>
                                        </div>

                                        <div className='col-md-5 mb-2'>
                                            <b>GST No</b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtGst}</strong>
                                            <InputText className='form-control' id='txtGst' placeholder='00XXXXX0000X0X0'
                                                value={formik.values.txtGst} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-4 mb-2'>
                                            <b>Status </b>
                                            <div className='form-control'>
                                                <b><input type='checkbox' onChange={(event) => setStatus(event.target.checked)} id='txtStatus' /> Active</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className='col-md-12 mb-2'>
                                            <b>Address </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtAddress}</strong>
                                            <textarea style={{ height: "108px" }} className='form-control' id='txtAddress'
                                                value={formik.values.txtAddress} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder=' Enter Address ...'></textarea>
                                        </div>
                                        <div className='col-md-6 mt-2'>
                                            <b>Contact No</b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtContact}</strong>
                                            <InputText className='form-control' id='txtContact' placeholder='0000000000'
                                                value={formik.values.txtContact} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-6 mt-2'>
                                            <b>Email </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtEmail}</strong>
                                            <InputText className='form-control' id='txtEmail' placeholder='XXXX000@gmail.com'
                                                value={formik.values.txtEmail} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-6 mb-2'>
                                            <b>Bank Name </b>
                                            <strong className="text-danger">*</strong>
                                            <InputText value={formik.values.txtBankName} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' id='txtBankName' placeholder='Bank Name ... ' />
                                        </div>
                                        <div className='col-md-6 mb-2'>
                                            <b>Account No </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtAcNo}</strong>
                                            <InputText className='form-control' id='txtAcNo' placeholder='000000000000'
                                                value={formik.values.txtAcNo} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-6 mb-2'>
                                            <b>IFSC Code </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtIFSC}</strong>
                                            <InputText className='form-control' id='txtIFSC' placeholder='Bank IFSC Code'
                                                value={formik.values.txtIFSC} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                        <div className='col-md-6 mb-2'>
                                            <b>Branch </b>
                                            <strong className="text-danger">*&nbsp;{formik.errors.txtBranch}</strong>
                                            <InputText className='form-control' id='txtBranch' placeholder='Branch Name'
                                                value={formik.values.txtBranch} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary btn-lg" data-bs-dismiss="modal">
                                {!loading ? "Save" : <><i className='fas fa-spinner'></i>&nbsp;Please Wait</>}
                            </button>
                            <button type="button" className="btn btn-secondary btn-lg" data-bs-dismiss="modal" onClick={() => cancelForm()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <Loading />
            <ToastContainer />
        </>
    );
}  