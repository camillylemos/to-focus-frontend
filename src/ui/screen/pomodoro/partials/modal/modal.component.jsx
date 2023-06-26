import { Delete } from '@mui/icons-material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { Button, Dialog, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Form, Input } from '@components'
import './modal.style.scss'

const dialogStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiPaper-root': {
    backgroundColor: '#D9D9D9',
    maxWidth: '580px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 0 30px',
    borderRadius: '10px',
  },
}

const ModalComponent = ({
  formData,
  handleSubmit,
  handleChange,
  handleClick,
  handleClickDelete,
  handleClickClose,
  pomodoroSettingsList,
  open,
}) => {
  return (
    <Dialog sx={dialogStyle} open={open} onClose={handleClickClose}>
      <Box>
        <Typography
          color="secondary"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            ml: 1,
            mt: 2,
            mb: 2,
            fontWeight: 500,
            fontSize: '20px',
            fontFamily: 'Roboto',
            alignItems: 'center',
          }}
        >
          Configurações
          {<AccessAlarmIcon color="secondary" sx={{ marginLeft: 1 }} />}
        </Typography>
      </Box>

      <Form onSubmit={handleSubmit} formData={formData}>
        <Input
          {...formData.name}
          handleChange={handleChange}
          autoComplete="false"
          sx={{ mr: 1, ml: 1, display: 'flex', justifyContent: 'center' }}
        />
        <Box display="flex" justifyContent="space-between">
          <Input
            {...formData.pomodoro}
            handleChange={handleChange}
            sx={{ width: '30%', mt: 1, mr: 0, ml: 1 }}
          />
          <Input
            {...formData.shortBreak}
            handleChange={handleChange}
            sx={{ width: '30%', mt: 1, mr: 0, ml: 1 }}
          />
          <Input
            {...formData.longBreak}
            handleChange={handleChange}
            sx={{ width: '30%', mt: 1, mr: 1, ml: 1 }}
          />
        </Box>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" type="submit">
            SALVAR
          </Button>
        </Box>
      </Form>

      <Box>
        <Typography
          color="secondary"
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            ml: 1,
            mt: 2,
            mb: 2,
            fontWeight: 500,
            fontSize: '20px',
            fontFamily: 'Roboto',
            alignItems: 'center',
          }}
        >
          Pomodoros Salvos
          {<TaskAltIcon color="secondary" sx={{ marginLeft: 1 }} />}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontWeight: 500,
            mb: 1,
            width: '100%',
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            color="secondary"
          >
            Nome
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            color="secondary"
          >
            Tempo de Foco
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            color="secondary"
          >
            Intervalo Curto
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
            color="secondary"
          >
            Intervalo Longo
          </Typography>
          <Box sx={{ flex: 0.5, display: 'flex', justifyContent: 'center' }}>
            <Delete style={{ color: '#D9D9D9' }} />
          </Box>
        </Box>
        {pomodoroSettingsList?.map(
          ({
            id,
            nomeCategoria,
            tempoFoco,
            tempoIntervaloCurto,
            tempoIntervaloLongo,
            isVisivel,
          }) =>
            !!isVisivel && (
              <button
                key={id}
                className="button__config__time__focus"
                onClick={() =>
                  handleClick({
                    id,
                    nomeCategoria,
                    tempoFoco,
                    tempoIntervaloCurto,
                    tempoIntervaloLongo,
                  })
                }
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {nomeCategoria}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {tempoFoco}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {tempoIntervaloCurto}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {tempoIntervaloLongo}
                </Typography>

                {pomodoroSettingsList.length !== 1 ? (
                  <IconButton
                    className="icon__delete__pomodoro"
                    onClick={evento => handleClickDelete({ id, evento })}
                    sx={{
                      flex: 0.5,
                      display: 'flex',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >
                    <Delete />
                  </IconButton>
                ) : (
                  <IconButton
                    className="icon__delete__pomodoro"
                    sx={{
                      flex: 0.5,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Delete style={{ color: '#D9D9D9' }} />
                  </IconButton>
                )}
              </button>
            )
        )}
      </Box>
    </Dialog>
  )
}

export { ModalComponent }
