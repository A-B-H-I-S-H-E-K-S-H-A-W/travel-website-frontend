import React from "react";
import Layout from "../../Layout";
import Input from "../../components/common/Input";
import { ButtonSolid } from "../../components/common/Button";
import Table from "../../components/common/Table";

const Checkout = () => {
  const months = [
    "Month",
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["Year"];

  for (let year = 1995; year <= 2025; year++) {
    years.push(year);
  }

  const rowData = [
    { name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane.smith@example.com", role: "Editor" },
    { name: "Mark Taylor", email: "mark.taylor@example.com", role: "Viewer" },
  ];

  const columnDefs = ["Name", "Email", "Role"];
  return (
    <Layout>
      <div className="px-20 py-28 h-screen">
        <div className="grid md:grid-cols-[69%_29%] gap-[2%]">
          <div className="">
            <Table columnDefs={columnDefs} rowData={rowData} />
          </div>
          <div className="p-4 ring rounded-xl shadow-2xl">
            <div>
              <div>
                <h3 className="text-3xl font-bold">Payment Method</h3>
                <p>Add a new payment method to your account.</p>

                <div className="py-6">
                  <div className="space-y-2 py-2">
                    <p className="font-medium">Name</p>
                    <Input type="text" placeholder={"Full Name"} />
                  </div>
                  <div className="space-y-2 py-2">
                    <p className="font-medium">City</p>
                    <Input type="text" placeholder={""} />
                  </div>
                  <div className="space-y-2 py-2">
                    <p className="font-medium">Card Number</p>
                    <Input type="number" placeholder={""} />
                  </div>
                  <div className="grid grid-cols-3 mt-8">
                    <div>
                      <label className="font-medium">Expires</label>
                      <select className="w-full border py-1.5 rounded-md">
                        {months.map((item, i) => (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-medium">Year</label>
                      <select className="w-full border py-1.5 rounded-md">
                        {years.map((year, i) => (
                          <option key={i} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-medium">CVC</label>
                      <Input type={"number"} placeholder={"CVC"} />
                    </div>
                  </div>
                  <div className="mt-8">
                    <ButtonSolid
                      title={"Continue"}
                      className={"px-[9.1rem] py-2 rounded-md"}
                    >
                      Continue
                    </ButtonSolid>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
