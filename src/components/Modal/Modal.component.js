import React, { memo } from "react";
import "./Modal.style.scss";
import { useSelector } from "react-redux";
import { downloadPDF, exportToExcel} from "../../utils/export";

const Modal = ({ orgUnits = [], handleDisplay, popupData }) => {
  const { question } = popupData;

  const { clickedOU, state, district, block } = useSelector((state) => state.outree);

  const { categoryId, subCategoryId, headId, subHeadId, status, subGroupId } = useSelector((state) => state.main);



  var date = new Date();
  date = `${('00' + date.getDate()).slice(-2)}-${('00' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
  const ouList = useSelector((state) => state.outree.ouList);

  return (
    <div id = "printing1" className="modal-container">
      <div className="modal-info border border-2 ">
        <div className="scroll">
          <table className="table table-font-size" >
            <thead className="header">
              <tr>
                <th className={"text-center"} style={{ background: "rgb(178, 223, 219)", border: "0px" }} colSpan={4}>
                  IPHS Line Listing <br />
                  Report as on {date}
                </th>
              </tr>
              <tr>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={2}>Category: {categoryId.name || ''}</th>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={2}>Sub-Category: {subCategoryId.name || ''}</th>
              </tr>
              <tr>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={2}>Head: {headId.name || ''}</th>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={2}>Head: {subGroupId.name || ''}</th>
              </tr>
              <tr>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={2}>Sub-Head: {subHeadId.name || ''}</th>
                <th style={{ background: "rgb(209, 209, 209)", border: "0px" }} colSpan={4}>Question: {question}</th>
              </tr>
              <tr>
                <th >S.No.</th>
                <th >State-District-Block</th>
                <th >Facility Name</th>
              </tr>
            </thead>
            <tbody>
              {
                orgUnits.map((orgUnit, index) => {
                  const ouData = ouList.find(ou => ou.id == orgUnit);

                  return <tr id={ouData.code + ouData.id}>
                    <td>{index + 1}</td>
                    <td>{ouData.path || ''}</td>
                    <td>{ouData.name || ''}</td>
                  </tr>

                })
              }
            </tbody>
          </table>

        </div>
        <div className="modal-foot d-flex justify-content-between align-items-center mx-2">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => handleDisplay(false)}
          >
            Close
          </button>
          <div className="pdf/excel">
            <button
              type="button"
              className="btn btn-secondary btn-light btn-sm mx-2"
              data-dismiss="modal"
              onClick={() =>downloadPDF("printing1") }
            >
            {<img width="29" height="29" src="https://img.icons8.com/color/29/pdf.png" alt="pdf" />}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-light btn-sm mx-2"
              data-dismiss="modal"
              onClick={() => exportToExcel("printing1")}
            >
            {<img width="30" height="30" src="https://img.icons8.com/color/30/ms-excel.png" alt="ms-excel" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default React.memo(Modal);

