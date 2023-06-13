-- remove_divs.lua

-- List of tags to remove
local tagsToRemove = {"navigation", "reflist", "toc", "references"}

function remove_divs_with_tags(elem)
    if elem.tag == "Div" then
        local divTag = elem.attributes["tag"]
        if divTag and contains(tagsToRemove, divTag) then
            -- Filter out Div elements with tags in the list
            return {}
        end
    end
end

-- Helper function to check if a value is in a table
function contains(table, value)
    for _, v in ipairs(table) do
        if v == value then
            return true
        end
    end
    return false
end

return {
    {
        Div = remove_divs_with_tags
    }
}
