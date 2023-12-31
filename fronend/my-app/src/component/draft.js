import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useCurrent } from "../hook/current";
import { useDraft } from "../hook/draft";

const Draft = () => {
  const access = localStorage.getItem("access");
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [topping, setTopping] = useState("input");
  const [is_checked, setIs_checked] = useState("true");

  const onOptionChange = (e) => {
    setTopping(e.target.value);
  };

  const onOptionChangeChecked = (e) => {
    setIs_checked(e.target.value);
  };
  const [tag, setTag] = useState("food");
  const [flag, setFlag] = useState(false);

  const { data } = useDraft(flag);
  const { data: current } = useCurrent();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/dashboard/account/draft/",
        {
          user_id: current.id,
          title: title,
          description: description,
          amount: amount,
          typ: topping,
          is_checked: is_checked,
          tag: tag,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${access}`,
            "X-CSRFToken":
              "gnu99yM7oNaRBL4Pjcs88CeWmxOWW55xf2lf1E7Hyzm4UlIZKCkYRI3RL9nTjwm5",
          },
        }
      )
      .then((result) => {
        setFlag(!flag);
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };

  const handleDelete = (e) => {
    axios
      .delete(
        `http://127.0.0.1:8000/api/dashboard/account/draft/${e}/`,

        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      )
      .then((result) => {
        setFlag(!flag);
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };

  return (
    <div className="p-4">
      <h1>Draft</h1>
      <div className="row">
        <div className="col-12 my-4">
          <div className="card">
            <div className="card-header">New Draft</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="amount">title</label>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    name="amount"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                  />
                  <label htmlFor="amount">Amount</label>
                  <input
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    name="amount"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                  />
                  <label htmlFor="amount">description</label>
                  <input
                    onChange={(e) => setDescription(e.target.value)}
                    name="amount"
                    className="form-control"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <label htmlFor="amount">tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="form-select form-select-lg"
                  aria-label=".form-select-lg example"
                >
                  <option value="food">food</option>
                  <option value="dress">dress</option>
                  <option value="bill">bill</option>
                  <option value="rent">rent</option>
                  <option value="leon">leon</option>
                  <option value="salary">salary</option>
                  <option value="cars and accessories">
                    cars and accessories
                  </option>
                  <option value="payment to other"> payment to other</option>
                  <option value="service">service</option>
                  <option value="health">health</option>
                  <option value="other">other</option>
                </select>

                <div className="grid grid-cols-2 ml-10 mt-2">
                  <div>
                    <label htmlFor="input">type</label>
                    <div className="ml-3 mt-1">
                      <div class="form-check mt-2">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="topping"
                          value="input"
                          id="input"
                          checked={topping === "input"}
                          onChange={onOptionChange}
                        />
                        <label class="form-check-label" htmlFor="input">
                          Input
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="topping"
                          value="output"
                          id="output"
                          checked={topping === "output"}
                          onChange={onOptionChange}
                        />
                        <label class="form-check-label" htmlFor="output">
                          Output
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="input">is checked</label>
                    <div className="ml-3">
                      <div class="form-check mt-1">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="is_checked"
                          value="true"
                          id="true"
                          checked={is_checked === "true"}
                          onChange={onOptionChangeChecked}
                        />
                        <label class="form-check-label" htmlFor="input">
                          true
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="is_checked"
                          value="false"
                          id="false"
                          checked={is_checked === "false"}
                          onChange={onOptionChangeChecked}
                        />
                        <label class="form-check-label" htmlFor="output">
                          false
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="m-2 btn btn-outline-primary">
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex">
              Draft
              <div className="input-group mb-3 w-25 ms-auto"></div>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3 text-left">Title</th>
                      <th className="px-6 py-3 text-left">Description</th>
                      <th className="px-6 py-3 text-left">Amount</th>
                      <th className="px-6 py-3 text-left">Tag</th>
                      <th className="px-6 py-3 text-left">Type</th>
                      <th className="px-6 py-3 text-left">is checked</th>

                      <th className="px-6 py-3 text-left">Created At</th>
                      <th className="px-6 py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 truncate w-96">
                            {item.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${item.amount}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.tag}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.typ}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800">
                            {item.is_checked.toString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className=" me-4 btn btn-danger btn-sm"
                          >
                            Delete<i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
