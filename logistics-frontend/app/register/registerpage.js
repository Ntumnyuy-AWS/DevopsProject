"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../services/api";
import { AuthContext } from "../../context/authContext.js"
import { FormContainer,
         Input,
         Button,
         Title
 } from "../../component/Layout/forms/FormStyle";

 export default function Register()  {
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const [ form, setForm ] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [ error, setError ] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const data = await apiRequest("/auth/register", "POST", form)
            login(data)
            router.push("/dashboard");
        }catch (err) {
            setError(err.message)
        }
    }

    return (
        <FormContainer>
            <Title>Register</Title>

            {error && <p style={{color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value})}/>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, email: e.target.value})}/>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, password: e.target.value})}/>
                <Button type="submit">Register</Button>
            </form>
        </FormContainer>
    )
 };