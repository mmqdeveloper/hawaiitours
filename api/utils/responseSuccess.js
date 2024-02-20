export const ResponseSuccess = (data, expressResponse ,message) => {
    expressResponse.json({
        status: 200,
        success: true,
        message: message,
        data: data,
      })
  };