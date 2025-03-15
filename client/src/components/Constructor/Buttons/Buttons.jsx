import React from 'react';

const Buttons = ({arr, setArr, openelements}) => {

    const groupedItems = arr.reduce((acc, item) => {
        acc[item.group] = acc[item.group] || [];
        acc[item.group].push(item);
        return acc;
    }, {});

    const onClickElement = (group, name) => {
        setArr((prevArr) =>
            prevArr.map((item) => {
                    return item.group === Number(group)
                        ? { ...item, check: item.name === name }
                        : item
                }
            )
        );
    };

    const block =
        <div className="absolute top-24 right-2">
            {Object.entries(groupedItems)
                .filter(([group]) => !isNaN(Number(group)))
                .map(([group, items]) => {
                        const uniqueItems = items.filter(
                            (item, index, self) => index === self.findIndex((i) => i.name === item.name)
                        );
                        return (
                            <div key={group}
                                 className="flex flex-col items-start backdrop-blur-sm bg-white/30 w-44 h-auto rounded-3xl p-3 mt-1">
                                {uniqueItems.map((i) => (
                                    <div
                                        key={i.name}
                                        className={`cursor-pointer ${i.check ? "text-white bg-gray-400 px-1 rounded w-full" : ""}`}
                                        onClick={() => onClickElement(group, i.name)}
                                    >{i.name}</div>
                                ))}
                            </div>
                        )
                    }
                )}
        </div>

    return (
        <>
            {openelements && block}
        </>
    );
};

export default Buttons;
