import type { Stock } from "@prisma/client";

type Props = {
    stocks: Stock[];
};

export default function Stock({ stocks }: Props) {
    return (
        <div>
            <h3>Акции</h3>
            
            {stocks ?
                <>
                    {stocks.map((stock) => {
                        return (
                            <div key={stock.id}>
                                <p>{stock.title}</p>
                                <p>{stock.body}</p>
                                <p>{stock.img}</p>
                                <div>{stock.show ? <p>Показан</p> : <p>Скрыт</p>}</div>
                            </div>)
                    })
                    }
                </>
                :
                <div>Нет акций</div>
            }
        </div>
    )
}