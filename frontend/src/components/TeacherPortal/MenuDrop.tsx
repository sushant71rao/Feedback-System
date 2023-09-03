import * as React from "react";
import { Teacher } from "../../types/types";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useSearchParams } from "react-router-dom";

const MenuDrop = () => {
  let [queryParams] = useSearchParams();
  const [searched, setSearched] = React.useState<Teacher[] | []>([]);
  let [searchstr, setSearch] = React.useState<{ NAME: string; _id: string }>({
    NAME:  queryParams.get("id") || "",
    _id: queryParams.get("id") || "",
  });
  let { teacher } = React.useContext(AuthContext);

  //
  React.useEffect(() => {
    {
      searchstr.NAME != "" &&
        axios
          .get(
            import.meta.env.VITE_GET_TEACHERS +
              `${teacher?.DEPARTMENT}/?keyword=${searchstr?.NAME}`,
            {
              withCredentials: true,
            }
          )
          .then((data) => {
            // console.log(data);
            setSearched(data?.data?.teacher ?? []);
          });
    }
  }, [searchstr]);
  console.log(searchstr);
  return (
    <>
      <input
        style={{
          width: "100%",
          padding: "4px",
          borderRadius: "2px",
          border: "2px solid grey",
        }}
        name="id"
        value={searchstr.NAME}
        placeholder="Search"
        type="text"
        list="browsers"
        onChange={(e) => setSearch((old) => ({ ...old, NAME: e.target.value }))}
      ></input>
      <datalist id="browsers">
        {searched?.map((ele, ind) => {
          return (
            <option value={String(ele._id)} key={ind}>
              {String(ele.NAME)}
            </option>
          );
        })}
      </datalist>
    </>
  );
};
export default MenuDrop;
