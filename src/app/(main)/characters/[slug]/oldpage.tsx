<motion.div
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1, delay: 0.7 }}
className="grid lg:grid-cols-4 grid-cols-1 gap-6"
>
<Accordion type="multiple">
  <AccordionItem value={"item-2"}>
    <AccordionTrigger>Character Stats</AccordionTrigger>
    <AccordionContent>
      <h2 className="text-sm font-semibold pb-1 pl-1">
        Level 1 stats:
      </h2>
      <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
        {Object.entries(character?.stats).map(([key, value]) => (
          <tr
            key={key}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500    border-b dark:border-gray-700"
          >
            <td className="p-4 text-lg">
              {splitBySlash(
                capitalise(splitByCapitalizationAndJoin(`${key}: `))
              )}
            </td>
            <td className="p-4 text-base">{value}</td>
          </tr>
        ))}
      </table>
    </AccordionContent>
  </AccordionItem>
</Accordion>

{/* TODO: Add Skills + Ultimate */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.8 }}
  className="lg:col-span-2 flex flex-col gap-5"
>
  <Accordion type="multiple">
    <AccordionItem value={"item-1"}>
      <AccordionTrigger>Skills</AccordionTrigger>
      <AccordionContent>
        <div className="bg-gray-900 flex flex-col items-center border border-gray-500 border-b gap-5 dark:border-gray-700 p-4">
          {character?.skills?.regularSkills.map((x, idx) => {
            return (
              <div
                className="flex gap-2 flex-col justify-center text-center w-full"
                key={idx}
              >
                <div>
                  <img
                    className="mx-auto"
                    src={x.imageUrl}
                    alt={x.name}
                  />
                </div>
                <div key={idx}>
                  <h1 className="text-lg font-bold">
                    {x.name} | {x.jpName}
                  </h1>
                </div>
                <table className="w-full text-sm  table-auto rtl:text-right text-gray-500 dark:text-white font-bold">
                  <thead>
                    <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
                      <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                        Rank
                      </th>
                      <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                        Description
                      </th>
                      <th className="px-6 border border-gray-500 py-4 whitespace-nowrap">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {x.ranks.map((y, idx) => (
                      <tr
                        key={idx}
                        className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                      >
                        <td className="p-4 border border-gray-500">
                          {idx + 1}
                        </td>
                        <td className="p-4 text-base font-semibold">
                          {y.description}
                        </td>
                        <td className="p-4 border border-gray-500">
                          {y.type}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
          <div className="w-full justify-center p-4 flex flex-col">
            <h1 className="font-bold text-xl text-center lg:text-left pb-5">
              Ultimate
            </h1>
            <img
              className="mx-auto"
              src={character?.skills?.ultimate.imageUrl}
              alt={character?.skills?.ultimate.name}
            />
            <h2 className="text-lg p-4 text-center font-bold">
              {character?.skills?.ultimate.name} |{" "}
              {character?.skills?.ultimate.jpName}
            </h2>
            <p className="text-base p-4 border-t-[1px] text-center border-t-white">
              {character?.skills?.ultimate.description}
            </p>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

</motion.div>

{/* TODO: Fix passive so that it displays the data and image */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.9 }}
>
  <Accordion
    type="multiple"
    className="flex flex-col text-center gap-5"
  >
    <AccordionItem value={"item-1"}>
      <AccordionTrigger>Passive</AccordionTrigger>
      <AccordionContent className="bg-gray-900 p-5 border border-gray-500   border-b dark:border-gray-700">
        <img
          className="w-28 mx-auto"
          src={character?.passive?.imageUrl}
          alt={character?.passive?.name}
        />
        <h2 className="p-4 font-bold">
          {character?.passive?.name} | {character?.passive?.jpName}
        </h2>
        <p className="text-base p-4 border-t-[1px] border-t-white">
          {character?.passive?.description}
        </p>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</motion.div>



{/* Association */}
{character.associations && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1 }}
  >
    <Accordion type="multiple">
      <AccordionItem value={"item-3"}>
        <AccordionTrigger>Associations</AccordionTrigger>
        <AccordionContent>
          <table className="w-full text-sm rtl:text-right text-white-500 text-center">
            <thead>
              <tr className="odd:bg-white odd:dark:bg-gray-900  text-lg even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500 font-bold text-gray-900 dark:text-white">
                <th className="px-6 border-r-[1px] border-gray-500 py-4 whitespace-nowrap">
                  Character
                </th>
                <th className="px-6 py-4 whitespace-nowrap">Bonus</th>
              </tr>
            </thead>
            <tbody>
              {character?.associations?.map((x, idx) => {
                const char = findCharacterFromSlug(x.slug);

                return (
                  <tr
                    key={idx}
                    className="odd:bg-white odd:dark:bg-gray-900  even:bg-gray-50 text-base even:dark:bg-gray-700 border border-gray-500"
                  >
                    <td className="p-4 border border-gray-500">
                      <Link className="space-y-3" href={char.slug}>
                        <img
                          className="w-20 mx-auto"
                          src={char.imageUrl}
                          alt={char.name}
                        />
                        <p className="font-bold text-base hover:opacity-60 transition-all duration-300">
                          {char.name}
                        </p>
                      </Link>
                    </td>
                    <td className="p-4 text-base font-semibold">
                      {x.bonus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  
  </motion.div>
)}

{/* Character Misc Info */}
{/* TODO: Fix table on smaller resolutions */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 1.1 }}
>
  <Accordion type="multiple">
    <AccordionItem value={"item-4"}>
      <AccordionTrigger>Misc Info</AccordionTrigger>
      <AccordionContent>
        <table className="w-full text-sm  rtl:text-right text-gray-500 dark:text-white font-bold">
          {Object.entries(character?.misc.info).map(([key, value]) => (
            <tr
              key={key}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-700 border border-gray-500   border-b dark:border-gray-700"
            >
              <td className="p-4 text-lg">
                {splitBySlash(
                  capitalise(splitByCapitalizationAndJoin(`${key}: `))
                )}
              </td>
              <td className="p-4 text-base">{value}</td>
            </tr>
          ))}
        </table>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

</motion.div>
{/* Gifts */}
{character?.gift && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.1 }}
  >
    <Accordion type="multiple">
      <AccordionItem value={"item-5"}>
        <AccordionTrigger>Gift</AccordionTrigger>
        <AccordionContent className="bg-gray-900 p-5 border border-gray-500   border-b dark:border-gray-700">
          <div className="flex flex-col justify-center items-center">
            {character?.gift.map((x, idx) => (
              <div key={idx} className="text-center">
                <img
                  alt={x.name}
                  className=" w-20  m-2 !mb-0"
                  src={x.imageUrl}
                />
                <p className="p-2 text-sm">{x.name}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  </motion.div>
)}
{/* Character Food */}

{character?.food && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.2 }}
  >
    <Accordion type="multiple">
      <AccordionItem value={"item-6"}>
        <AccordionTrigger>Food</AccordionTrigger>
        <AccordionContent className="bg-gray-900 p-5 border border-gray-500   border-b dark:border-gray-700">
          <div className="flex flex-col justify-center items-center">
            {character?.food.map((x, idx) => (
              <div key={idx} className="text-center w-full">
                <img
                  alt={x.meal.name}
                  className=" w-20 mx-auto"
                  src={x.meal.imageUrl}
                />
                <p className="p-2 text-sm">{x.meal.name}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  </motion.div>
)}

{/* Holy Relics */}

{character?.holyRelic && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 1.4 }}
  >
    <Accordion type="multiple">
      <AccordionItem value={"item-6"}>
        <AccordionTrigger>Holy Relic</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col justify-center items-center">
            {character?.holyRelic.map((x, idx) => (
              <div
                key={idx}
                className="flex flex-col text-center space-y-2 items-center"
              >
                <img
                  alt={x.relic.name}
                  className=" w-20 m-2 !mb-0"
                  src={x.relic.imageUrl}
                />
                <p className="p-2">{x.relic.name}</p>
                <p className="text-sm p-1">Attack: {x.stats?.attack}</p>
                <p className="text-sm p-1">
                  Defense: {x.stats?.defense}
                </p>
                <p className="text-sm p-1">HP: {x.stats?.hp}</p>
                <p className="p-2">{x.effect}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

  </motion.div>
)}

{/* component */}

</motion.div>