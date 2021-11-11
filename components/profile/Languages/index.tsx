/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { gql, useMutation } from '@apollo/client'
import Button from '@material-ui/core/Button'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'

import { UserIsReadOnlyContext } from '../../../src/context/isReadOnlyContext'
import Loader from '../../common/Loader'
import DeleteAlert from '../DeleteAlert'
import TextFieldAndDeleteBtn from '../TextFieldAndDeleteBtn'

const UPDATE_USER = gql`
  mutation UpdateUserLanguages($_id: ID!, $languages: [String]) {
    updateUserLanguages(_id: $_id, languages: $languages) {
      languages
    }
  }
`
const useStyles = makeStyles(() =>
  createStyles({
    btn: {
      alignSelf: 'flex-end',
      borderRadius: '999px',
    },
    savecancelbtn: {
      marginRight: '.5rem',
    },
  })
)

const Language = ({ data, userId }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState<boolean>(!data)
  const [popUp, setPopup] = useState({ show: false, index: null })
  const isReadOnly = useContext(UserIsReadOnlyContext)

  const [languages, setLanguages] = useState<string[]>(data)
  const [updatedLanguages, setUpdatedLanguages] = useState(null)

  const [updateUserLanguage, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted(val) {
      const newUserLanguages = val.updateUserLanguages.languages
      setLanguages(newUserLanguages)
      setUpdatedLanguages(newUserLanguages)
      setEdit(false)
    },
  })

  const updateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updateUserLanguage({
      variables: { _id: userId, languages },
    })
  }

  const cancelUpdateUser = () => {
    const revertUserLanguages = updatedLanguages || data
    setLanguages(revertUserLanguages)
    setEdit(false)
  }

  const handleChange = (index: number) => (evt: ChangeEvent<HTMLInputElement>) => {
    setLanguages([...languages.slice(0, index), evt.target.value, ...languages.slice(index + 1)])
  }

  const addLanguage = () => {
    setLanguages([...languages, ''])
  }

  const openPopup = (i) => {
    setPopup({ show: true, index: i })
  }
  const closePopUp = () => {
    setPopup({ show: false, index: null })
  }

  const handleDelete = async () => {
    const filterDeletedItem = languages.filter((_, index) => index !== popUp.index)

    await updateUserLanguage({
      variables: { _id: userId, languages: filterDeletedItem },
    })
    closePopUp()
  }

  if (loading) return <Loader open={loading} error={error} />

  return (
    <div className="bg-resume flex flex-col justify-center p-4 md:p-6">
      <div className="flex justify-between pb-3">
        <h3 className="text-xl md:text-2xl uppercase">Languages</h3>
        {!edit && !isReadOnly ? (
          <button onClick={() => setEdit(true)}>
            <EditIcon />
          </button>
        ) : null}
      </div>
      {edit && !isReadOnly ? (
        <form className="flex flex-col" onSubmit={updateUser}>
          {languages.map((lang, i): any => (
            <TextFieldAndDeleteBtn
              key={i}
              handleChange={handleChange}
              index={i}
              label="language"
              value={lang}
              openPopup={openPopup}
            />
          ))}
          {popUp.show ? <DeleteAlert closePopUp={closePopUp} handleDelete={handleDelete} /> : null}

          <Button className={classes.btn} onClick={() => addLanguage()}>
            Add Language
          </Button>
          <div className="pt-1 self-end">
            <Button className={classes.savecancelbtn} type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              className={classes.savecancelbtn}
              onClick={() => cancelUpdateUser()}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="uppercase">{languages.join(' | ')}</div>
      )}
    </div>
  )
}

export default Language
