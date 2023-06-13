-- remove_tables.lua

function remove_tables(elem)
    if elem.tag == "Table" then
        -- Filter out Table elements
        return {}
    end
end

return {
    {
        Table = remove_tables
    }
}