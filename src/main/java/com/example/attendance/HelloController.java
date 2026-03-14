package com.example.attendance;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class HelloController {

    private final AttendanceRepository attendanceRepository;

    public HelloController(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    private Attendance currentAttendance;

    @GetMapping("/hello")
    public String hello() {
        return "勤怠システムスタート！";
    }

@GetMapping("/clock-in")
public String clockIn() {

    Attendance attendance = new Attendance();
    attendance.setClockIn(LocalDateTime.now());

    attendanceRepository.save(attendance);

    currentAttendance = attendance;

    return "出勤しました！ 出勤時刻: " + attendance.getClockIn();
}

   @GetMapping("/clock-out")
public String clockOut() {

    if (currentAttendance == null) {
        return "先に出勤してください";
    }

    currentAttendance.setClockOut(LocalDateTime.now());

    attendanceRepository.save(currentAttendance);

    return "退勤しました！ 退勤時刻: " + currentAttendance.getClockOut();
}

@GetMapping("/records")
public List<Attendance> records() {
    return attendanceRepository.findAll();
}

}