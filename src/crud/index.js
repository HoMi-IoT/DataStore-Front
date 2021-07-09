import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getNames, createName, removeName } from "./api";
import { Link } from "react-router-dom";
import FormElement from "./Form";
import Loading from "./Loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Crud = () => {
    const [value, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [names, setNames] = useState([]);

    useEffect(() => {
        loadNames();
    }, []);

    const loadNames = () => getNames().then((name) => setNames(name.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createName({ value })
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.value}" is created`);
                loadNames();
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = (id, value) => {
        if (window.confirm("Want to delete?")) {
            setLoading(true);
            removeName(id)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${value} is deleted`);
                    loadNames();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    return (
        <div>
            <div>
                <div>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <h4 className="text-center">CRUD with JSON Server</h4>
                            <FormElement
                                handleSubmit={handleSubmit}
                                value={value}
                                setName={setName}
                            />
                            {names &&
                                names.map((t) => (
                                    <div
                                        className="border row mx-2 align-items-center"
                                        key={t.id}
                                    >
                                        <ul className="list-group">
                                            <li className="list-group-item">{t.id}: {t.value}</li>
                                        </ul>
                                        <span
                                            onClick={() => handleRemove(t.id, t.value)}
                                            className="btn btn-sm float-right"
                                        >
                                            <DeleteOutlined className="text-danger" />
                                        </span>
                                        <Link to={`/update/${t.id}`}>
                                            <span className="btn btn-sm float-right">
                                                <EditOutlined className="text-warning" />
                                            </span>
                                        </Link>
                                    </div>
                                ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Crud;