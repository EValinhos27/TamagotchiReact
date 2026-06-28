import { useState, useEffect } from 'react'

const BASE_URL = 'https://69f4b2d2fb098eb7f0b4c34c.mockapi.io/product'

export function useProdutos() {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const res = await fetch(BASE_URL)
                if (!res.ok) throw new Error('Erro ao buscar produtos')
                const data = await res.json()
                setProdutos(data)
            } catch (e) {
                setErro(e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProdutos()
    }, [])

    return { produtos, loading, erro }
}