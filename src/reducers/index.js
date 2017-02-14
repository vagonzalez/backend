export const reduceExports = (res, row) => {
  res[row.filename] = row.fun
  return res
}

export const reduceModules = (res, row) => {
  res['filename'] = row.filename
  res['fun'] = row.fun
  return res
}

export const reduceModule = (res, row) => {
  Object.keys(row.fun).forEach((key) => {
    res[key] = row.fun[key]
  })
  return res
}
